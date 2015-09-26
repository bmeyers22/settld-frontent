import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('create.job');
  },
  afterModel(model, transition) {
    if (model.job.get('category') === null || model.job.get('category') === undefined) {
      this.transitionTo('create');
    }
  }
});
