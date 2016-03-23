import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('create.transaction');
  },
  afterModel(model, transition) {
    if (model.transaction.get('category') === null || model.transaction.get('category') === undefined) {
      this.transitionTo('create');
    }
  }
});
