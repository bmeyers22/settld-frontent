import Ember from 'ember';

export default Ember.Route.extend({
  sessionService: Ember.inject.service('current-session'),
  model() {
    return this.get('sessionService').initializeUser(this.get('session'), this.get('store'));
  },
  afterModel(model, transition) {
    if (!model.get('userSettings.isUserConfigured')) {
      if (!/^register/.test(transition.targetName)) {
        this.transitionTo('register.name');
      }
    } else if (!model.get('userSettings.isGroupConfigured')) {
      this.transitionTo('getstarted');
    } else if (transition.targetName === 'index.index') {
      this.transitionTo('app');
    }
  }
});
