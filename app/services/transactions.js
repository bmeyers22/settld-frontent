import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  filterInvoicesByStatus(transaction, property, value, payerId) {
    return transaction.get('invoices').find( function (inv) {
      let propTrue = inv.get(property) === value,
        matchedUser = true;
      if (payerId) {
        matchedUser = payerId === inv.get('payerId');
      }
      return propTrue && matchedUser
    });
  },
  getOwedInvoicesByUser(transaction, payeeId) {
    let invoices = transaction.get('invoices').filter( (inv) => {
      return inv.get('paid') === false && payeeId === inv.get('payeeId');
    });
    return invoices.map( (invoice) => {
      return {
        user: this.get('store').find('user', invoice.get('payerId')),
        invoice: invoice
      }
    });
  }
});
