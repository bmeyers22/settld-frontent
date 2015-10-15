import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return new Promise( (resolve, reject) => {
      this.store.query('transaction', {
        home: this.get('currentSession.currentHome.id')
      }).then( (response) => {
        return this.store.query('job', {
          home: this.get('currentSession.currentHome.id')
        });
      }).then( (response) => {
        return resolve({
          feedList: [
            this.store.filter('transaction', function () {
              return true;
            }),
            this.store.filter('job', function () {
              return true;
            })
          ]
        })
      });
    });
  }
});
