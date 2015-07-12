import Ember from 'ember';
var InvoiceActionController;

InvoiceActionController = Ember.Controller.extend({
  transactions: Ember.A(),
  addTransaction: function(txn) {
    if (!this.transactions.contains(txn && txn.getOpenInvoice(this.session.get('authUser')))) {
      return this.transactions.addObject(txn);
    }
  },
  removeTransaction: function(txn) {
    return this.transactions.removeObject(txn);
  }
});

export default InvoiceActionController;
