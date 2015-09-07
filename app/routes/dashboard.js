import Ember from 'ember';

var DashboardRoute = Ember.Route.extend({
  model() {
    return this.session.get('authUser');
  }
});

export default DashboardRoute
