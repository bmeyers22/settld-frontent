import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('create.transaction');
  },
  afterModel(model, transition) {
    if (model.get('category') === null || model.get('category') === undefined) {
      this.transitionTo('create');
    }
  }
});
