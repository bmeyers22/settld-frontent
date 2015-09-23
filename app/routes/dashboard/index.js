import Ember from 'ember';

var DashboardIndexRoute = Ember.Route.extend({
  model() {
    return this.session.get('authUser');
  }
});

export default DashboardIndexRoute
