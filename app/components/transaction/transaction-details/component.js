import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['transaction-details'],
  invoices: Ember.computed( function () {
    return this.get('transaction.invoices').map( (inv) => {
      return {
        user: this.get('store').find('user', inv.get('payer')),
        data: inv
      }
    })
  })
});
