import Ember from 'ember';

var Login = Ember.Route.extend({
  beforeModel: function(transition) {
    if ((this.session.get('authUser') != null)) {
      return this.transitionTo('app');
    }
  }
});

export default Login
