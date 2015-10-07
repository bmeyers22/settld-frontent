import Ember from 'ember';

export default Ember.Component.extend({
  transactionsService: Ember.inject.service('transactions'),
  unpaidInvoice: Ember.computed('model.invoices.@each.paid', 'model.invoices.@each.paymentPending', function () {
    if (this.get('model.user') === this.get('session.authUser')) {
      return false;
    }
    let invoice = this.get('transactionsService').filterInvoicesByStatus(this.get('model'), 'paid', false, this.get('session.authUser.id'));
    return !this.get('pendingInvoice') && invoice;
  }),
  pendingInvoice: Ember.computed('model.invoices.@each.paymentPending', function () {
    if (this.get('model.user') === this.get('session.authUser')) {
      return false;
    }
    return this.get('transactionsService').filterInvoicesByStatus(this.get('model'), 'paymentPending', true, this.get('session.authUser.id'));
  }),
  owedInvoices: Ember.computed('model', function () {
    return this.get('transactionsService').getOwedInvoicesByUser(this.get('model'), this.get('session.authUser.id'));
  }),
  unpaidOwedInvoice: Ember.computed('owedInvoices.[]', function () {
    return this.get('owedInvoices').filter( (obj) => {
      return !obj.invoice.get('paymentPending');
    })
  }),
  canDelete: Ember.computed(function () {
    return this.get('model.user') === this.get('session.authUser')
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
      invoice.save()
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
