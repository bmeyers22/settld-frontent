import Ember from 'ember'

var HomesIndexRoute = Ember.Route.extend(
  {model: function() {
    return this.store.all('home');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    return;
  },
  actions: {editHome: function(home) {
    this.transitionTo('homes.edit', home);
    return;
  }}
});

export default HomesIndexRoute
