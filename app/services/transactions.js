import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  filterInvoicesByStatus(transaction, property, value, userId) {
    return transaction.get('invoices').find( (inv) => {
      let propTrue = inv.get(property) === value,
        matchedUser = true;
      if (userId && !this.userOwnsTransaction(transaction, userId)) {
        matchedUser = userId === inv.get('payerId');
      }
      return propTrue && matchedUser
    });
  },
  userOwnsTransaction(transaction, userId) {
    return transaction.get('user.id') === userId;
  },
  getUsersInvolved(invoice) {
    return [invoice.get('payerId'), invoice.get('payeeId')];
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
