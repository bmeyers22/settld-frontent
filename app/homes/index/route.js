import Ember from 'ember';

export default Ember.Route.extend(
  {model() {
    return this.store.peekAll('home');
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
