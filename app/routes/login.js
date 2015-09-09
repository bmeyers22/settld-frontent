import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

var Login = Ember.Route.extend(UnauthenticatedRouteMixin, {
  actions: {
    registered() {
      this.transitionto('register.name');
    }
  }
});

export default Login
