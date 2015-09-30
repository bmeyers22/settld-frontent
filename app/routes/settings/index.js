
import Ember from 'ember';


var SettingsIndexRoute = Ember.Route.extend({
  model() {
    return this.session.get('authUser');
  },
  actions: {
    connect(provider){
      let session = this.get('session');
      this.get('torii').open(provider).then((data) => {
        this.get('sessionService').authenticateUser(this.get('session'), data);
      });
    },

  }
});

export default SettingsIndexRoute
