import Ember from 'ember';
import Transaction from 'web/models/transaction';
import Job from 'web/models/job';

export default Ember.Component.extend({
    classNames: ['event'],
    transactionsService: Ember.inject.service('transactions'),
    currentSession: Ember.inject.service(),
    pendingInvoice: false,
    paidInvoice: false,
    rejectedInvoice: false,
    click() {
        if (this.get('isTransaction')) {
            this.sendAction('openActionBar', this.get('item'));
        }
    },
    isTransaction: Ember.computed(function() {
        var model;
        model = this.get('item');
        if (model.constructor.modelName === 'transaction') {
            return true;
        }
        return false
    }),
    isJob: Ember.computed(function() {
        var model;
        model = this.get('item');
        if (model.constructor.modelName === 'transaction') {
            return true;
        }
        return false
    }),
    iconType: Ember.computed('classType', function() {
        var base, classType;
        classType = this.get('classType');
        base = 'icon ';
        return base + (classType === 'transaction' ? 'dollar' : classType === 'job' ? 'briefcase' : '');
    }),
    displayName: Ember.computed('item.user', function() {
        let isMe = this.get('item.user.content') === this.get('currentSession.authUser');
        if (isMe) {
            return 'You';
        } else {
            return this.get('item.user.content.firstName');
        }
    }),
    actionName: Ember.computed(function() {
        var classType;
        classType = this.get('classType');
        if (classType === 'transaction') {
            return 'bought';
        } else if (classType === 'job') {
            return 'performed';
        } else {
            return '';
        }
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
