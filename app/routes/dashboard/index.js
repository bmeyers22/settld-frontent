import Ember from 'ember';

var DashboardIndexRoute = Ember.Route.extend(
  {model() {
    return this.session.get('authUser');
  },
  setupController(controller, model) {
    controller.set('model', model);
    return;
  }}
);

export default DashboardIndexRoute
