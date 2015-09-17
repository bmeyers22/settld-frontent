import Ember from 'ember';

export default Ember.Controller.extend({
  transactionsService: Ember.inject.service('transactions'),
  unpaidInvoice: Ember.computed('model', function () {
    let invoice = this.get('transactionsService').filterInvoicesByStatus(this.get('model'), 'paid', false, this.get('session.authUser.id'));
    return !this.get('pendingInvoice') && invoice;
  }),
  pendingInvoice: Ember.computed('model', function () {
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
  actions: {
    markPaid(invoice) {
      invoice.setProperties({
        paid: true,
        paymentPending: false,
        paymentConfirmedDate: new Date()
      })
      invoice.save()
    }
  }
});
