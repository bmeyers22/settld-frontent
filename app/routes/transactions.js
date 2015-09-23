import Ember from 'ember';

var TransactionsRoute = Ember.Route.extend({
  model() {
    return new Promise( (resolve, reject) => {
      this.store.query('transaction', {
        home: this.get('session.currentHome.id')
      }).then( (transactions) => {
        resolve({
          transactions: this.store.filter('transaction', function () {
            return true;
          })
        })
      });
    });
  }
});

export default TransactionsRoute
