import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('register');
  },
  afterModel(model, transition) {
    if (model.get('firstName')) {
      this.transitionTo('register.payment')
    }
  }
});
