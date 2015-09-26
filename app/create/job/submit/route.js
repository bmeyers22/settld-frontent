import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('create.job');
  },
  afterModel(model, transition) {
    if (!model.job.get('title')) {
      this.transitionTo('create');
    }
  }
});
