import Ember from 'ember';

var DashboardRoute = Ember.Route.extend({
  model: function() {
    return this.session.get('authUser');
  }
});

export default DashboardRoute
