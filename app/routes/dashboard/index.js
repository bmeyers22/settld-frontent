import Ember from 'ember';

var DashboardIndexRoute = Ember.Route.extend({
  model() {
    return this.get('currentSession.authUser');
  }
});

export default DashboardIndexRoute
