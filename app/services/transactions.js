import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  filterInvoicesByStatus(transaction, property, value, userId) {
    return transaction.get('invoices').then((invoices) => {
        return invoices.find( (inv) => {
          let propTrue = inv.get(property) === value,
            matchedUser = true;
          if (userId && !this.userOwnsTransaction(transaction, userId)) {
            matchedUser = userId === inv.get('payer');
          }
          return propTrue && matchedUser
        });
    })
  },
  userOwnsTransaction(transaction, userId) {
    return transaction.get('user.content.id') === userId;
  },
  getUsersInvolved(invoice) {
    return [invoice.get('payer'), invoice.get('payee')];
  },
  getOwedInvoicesByUser(transaction, payee) {
    return transaction.get('invoices').then((invoices) => {
        return invoices.filter( (inv) => {
          return !inv.get('paid') && payee === inv.get('payee');
        }).map( (invoice) => {
          return {
            user: this.get('store').find('user', invoice.get('payer')),
            invoice: invoice
          }
        });
    })
  }
});
