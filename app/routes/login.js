import Ember from 'ember';

var Login = Ember.Route.extend({
  sessionService: Ember.inject.service('session'),
  actions: {
    login(provider){
      let session = this.get('session');
      this.get('torii').open(provider).then((data) => {
        this.get('sessionService').authenticateUser(this.get('session'), data);
      });
    },
    registered() {
      this.transitionto('register.name');
    }
  }
});

export default Login
