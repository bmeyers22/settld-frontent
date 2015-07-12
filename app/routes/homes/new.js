import Ember from 'ember'

var HomesNewRoute = Ember.Route.extend(
  {model: function() {
    return this.store.createRecord('home');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    return;
  },
  actions:
    {cancelCreate: function(home) {
      home.deleteRecord();
      this.transitionTo('homes');
      return;
    },
    saveHome: function(home) {
      this.transitionTo('homes');
      return;
    }}
});

export default HomesNewRoute
