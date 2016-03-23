import Ember from 'ember';

export default Ember.Component.extend({
    transactionsService: Ember.inject.service('transactions'),
    currentSession: Ember.inject.service(),
    firebase: Ember.inject.service(),
    unpaidInvoice: null,
    pendingInvoice: null,
    owedInvoices: null,
    unpaidInvoiceObserver: Ember.on('init', Ember.observer('model.invoices.@each.paid', 'model.invoices.@each.paymentPending', function () {
        if (this.get('model.user.content') === this.get('currentSession.authUser')) {
            this.set('unpaidInvoice', false);
            return;
        }
        this.get('transactionsService').filterInvoicesByStatus(this.get('model'), 'paid', false, this.get('currentSession.authUser.id')).then((inv) => {
            this.set('unpaidInvoice', !this.get('pendingInvoice') && inv);
        });
    })),
    pendingInvoiceObserver: Ember.on('init', Ember.observer('model.invoices.@each.paymentPending', function () {
        if (this.get('model.user.content') === this.get('currentSession.authUser')) {
            this.set('pendingInvoice', false);
            return;
        }
        this.get('transactionsService').filterInvoicesByStatus(this.get('model'), 'paymentPending', true, this.get('currentSession.authUser.id')).then((inv) => {
            this.set('pendingInvoice', !!inv);
        });
    })),
    owedInvoicesObserver: Ember.on('init', Ember.observer('model', function () {
        return this.get('transactionsService').getOwedInvoicesByUser(this.get('model'), this.get('currentSession.authUser.id')).then((invoices) => {
            this.set('owedInvoices', invoices);
        });
    })),
    unpaidOwedInvoice: Ember.computed('owedInvoices.[]', function () {
        return this.get('owedInvoices').filter( (obj) => {
            return !obj.invoice.get('paymentPending');
        })
    }),
    canDelete: Ember.computed(function () {
        return this.get('model.user.content') === this.get('currentSession.authUser')
        && this.get('owedInvoices.length') === this.get('model.invoices.length');
    }),
    actions: {
        addInvoiceToPayments(invoice) {
            this.sendAction('addInvoiceToPayments', invoice);
        },
        markPaid(invoice) {
            invoice.setProperties({
                paid: true,
                paymentPending: false,
                paymentConfirmedDate: new Date()
            })
            invoice.save().then((invoice) => {
                this.get('firebase').child('paidInvoices').child(invoice.get('id')).set(invoice.toJSON());
            })
        },
        deleteTransaction(model) {
            this.sendAction('deleteTransaction', model);
        }
    },
    didRender() {
        let self = this;
        this.$().on('click', '.item.delete', (e) => {
            $('.ui.delete-transaction.modal')
            .modal({
                closable  : false,
                onDeny    : function() {

                },
                onApprove : function() {
                    self.sendAction('deleteTransaction', self.get('model'));
                }
            })
            .modal('show');
        })
    }
});
