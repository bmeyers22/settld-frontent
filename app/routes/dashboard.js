import Ember from 'ember';

var DashboardRoute = Ember.Route.extend({
  model() {
    return new Promise( (resolve, reject) => {
      this.store.query('transaction', {}).then( (transactions) => {
        resolve({
          transactions: this.store.filter('transaction', function () {
            return true;
          })
        })
      });
    });
  }
});

export default DashboardRoute
