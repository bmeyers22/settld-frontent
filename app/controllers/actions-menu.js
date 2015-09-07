import Ember from 'ember';

export default Ember.Controller.extend({
  unpaidInvoice: Ember.computed('model', function () {
    let self = this;
    return this.get('model.invoices').find( function (inv) {
      return self.get('session.authUser.id') === inv.get('payerId') && !inv.get('paymentPending') && !inv.get('paid');
    });
  }),
  pendingInvoice: Ember.computed('model', function () {
    let self = this;
    return this.get('model.invoices').find( function (inv) {
      return self.get('session.authUser.id') === inv.get('payerId') && inv.get('paymentPending');
    });
  }),
  owedInvoices: Ember.computed('model', function () {
    let self = this,
    invoices = this.get('model.invoices').filter(function (inv) {
      return inv.get('paid') === false && self.get('session.authUser.id') === inv.get('payeeId');
    });
    return invoices.map(function (invoice) {
      return {
        user: self.store.find('user', invoice.get('payerId')),
        invoice: invoice
      }
    });
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
