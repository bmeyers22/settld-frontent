import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionService: Ember.inject.service('session'),
  beforeModel(transition) {
    this._super(transition);
    if (!this.session.get('isAuthenticated')) {
      transition.abort();
      this.transitionTo('login');
    }
  },
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
