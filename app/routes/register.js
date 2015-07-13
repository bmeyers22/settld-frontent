import Ember from 'ember';

var Register = Ember.Route.extend({
  beforeModel: function(transition) {
    if ((this.session.get('authUser') != null)) {
      return this.transitionTo('app');
    }
  }
});

export default Register
