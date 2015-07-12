
import Ember from 'ember'


var GetstartedNewRoute = Ember.Route.extend(
  {model: function() {
    return this.store.createRecord('home');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    return;
  },
  actions: {saveHome: function(home) {
    this.transitionTo('dashboard');
    return;
  }}
});

export default GetstartedNewRoute
