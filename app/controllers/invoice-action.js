import Ember from 'ember';
var InvoiceActionController;

InvoiceActionController = Ember.Controller.extend({
  transactions: Ember.A(),
  addTransaction(txn) {
    if (!this.transactions.contains(txn && txn.getOpenInvoice(this.session.get('authUser')))) {
      return this.transactions.addObject(txn);
    }
  },
  removeTransaction(txn) {
    return this.transactions.removeObject(txn);
  }
});

export default InvoiceActionController;
