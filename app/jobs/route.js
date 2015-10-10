import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return new Promise( (resolve, reject) => {
      this.store.query('job', {
        user: this.get('currentSession.authUser.id'),
        home: this.get('session.currentHome.id')
      }).then( (response) => {
        return resolve({
          feedList: [
            this.store.filter('job', function () {
              return true;
            })
          ]
        })
      });
    });
  }
});
