import Ember from 'ember';

var DashboardRoute = Ember.Route.extend({
  model() {
    return new Promise( (resolve, reject) => {
      this.store.query('transaction', {}).then(function (transactions) {
        resolve({
          transactions: transactions
        })
      });
    });
  }
});

export default DashboardRoute
