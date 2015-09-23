import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

var Login = Ember.Route.extend(UnauthenticatedRouteMixin, {
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
