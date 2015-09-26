import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return new Promise( (resolve, reject) => {
      this.store.query('transaction', {
        user: this.get('session.authUser.id'),
        home: this.get('session.currentHome.id')
      }).then( (response) => {
        return resolve({
          feedList: [
            this.store.filter('transaction', function () {
              return true;
            })
          ]
        })
      });
    });
  }
});
