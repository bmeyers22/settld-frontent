import Ember from 'ember';

var DashboardRoute = Ember.Route.extend(
  {model: function() {
    return this.session.get('authUser');
  },
  setupController: function(controller, model) {
    var controllerFeed = this.controllerFor('feeds/dashboard');
    return;
  }}
);

export default DashboardRoute
