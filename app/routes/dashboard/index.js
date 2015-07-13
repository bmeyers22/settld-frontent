import Ember from 'ember';

var DashboardIndexRoute = Ember.Route.extend(
  {model: function() {
    return this.session.get('authUser');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    return;
  }}
);

export default DashboardIndexRoute
