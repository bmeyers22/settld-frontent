import Ember from 'ember';
import Transaction from 'web/models/transaction';
import Job from 'web/models/job';

export default Ember.Component.extend({
    classNames: ['event'],
    firebaseApp: Ember.inject.service(),
    transactionsService: Ember.inject.service('transactions'),
    currentSession: Ember.inject.service(),
    pendingInvoice: false,
    paidInvoice: false,
    rejectedInvoice: false,
    numberOfLikes: 0,
    hasLikedTransaction: false,
    displayName: Ember.computed('item.user.currentState.isLoading', function() {
        let isMe = this.get('item.user.content') === this.get('currentSession.authUser');
        if (isMe) {
            return 'You';
        } else {
            return this.get('item.user.content.firstName');
        }
    }),
    click() {
        if (!$('.global-action-bar').sidebar('is visible')) {
            this.sendAction('openActionBar', this.get('item'));
        }
        return false;
    },
    actions: {
        toggleLike() {
            if (this.get('hasLikedTransaction')) {
                let userRef = this.getUserLikedRef();
                userRef.once('value', (snapshot) => {
                    this.get('firebaseApp').child(`transactionLikes/${snapshot.val()}`).remove();
                    userRef.remove();
                })
            } else {
                let ref = this.get('firebaseApp').child('transactionLikes').push({
                    user: this.get('currentSession.authUser.id'),
                    transaction: this.get('item.id')
                });
                this.getUserLikedRef().set(ref.key());
            }
        }
    },
    getUserLikedRef() {
        return this.get('firebaseApp').child(`userTransactionLikes/${this.get('currentSession.authUser.id')}/${this.get('item.id')}`);
    },
    userLikedObserver: Ember.on('init', function () {
        let ref = this.getUserLikedRef().on('value', (snapshot) => {
            if (snapshot.exists()) {
                this.set('hasLikedTransaction', true);
            } else {
                this.set('hasLikedTransaction', false);
            }
        });
    }),
    likesObserver: Ember.on('init', function () {
        let ref = this.get('firebaseApp').child('transactionLikes').orderByChild('transaction').equalTo(this.get('item.id')).on('value', (snapshot) => {
            this.set('numberOfLikes', snapshot.numChildren());
        });
    }),
    pendingInvoiceObserver: Ember.on('init', Ember.observer('item.invoices.@each.paymentPending', function() {
        return this.get('transactionsService').filterInvoicesByStatus(this.get('item'), 'paymentPending', true, this.get('currentSession.authUser.id')).then((inv) => {
            this.set('pendingInvoice', !!inv);
        });
    })),
    paidInvoiceObserver: Ember.on('init', Ember.observer('item.invoices.@each.paid', function() {
        return this.get('transactionsService').filterInvoicesByStatus(this.get('item'), 'paid', true, this.get('currentSession.authUser.id')).then((inv) => {
            this.set('paidInvoice', !!inv);
        });
    })),
    rejectedInvoiceObserver: Ember.on('init', Ember.observer('item.invoices.@each.paymentRejected', function() {
        return this.get('transactionsService').filterInvoicesByStatus(this.get('item'), 'paymentRejected', true, this.get('currentSession.authUser.id')).then((inv) => {
            this.set('rejectedInvoice', !!inv);
        });
    }))
});
