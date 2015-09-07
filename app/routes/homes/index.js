import Ember from 'ember';

var HomesIndexRoute = Ember.Route.extend(
  {model() {
    return this.store.all('home');
  },
  setupController(controller, model) {
    controller.set('model', model);
    return;
  },
  actions: {editHome(home) {
    this.transitionTo('homes.edit', home);
    return;
  }}
});

export default HomesIndexRoute
