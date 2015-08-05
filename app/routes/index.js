import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionService: Ember.inject.service('session'),
  beforeModel(transition) {
    this._super(transition);
    if (!this.session.get('isAuthenticated')) {
      transition.abort();
      this.transitionTo('login');
    } else {
      return this.get('sessionService').initializeUser(this.get('session'), this.get('store'));
    }
  },
  afterModel(transition) {
    if (!this.session.get('userSettings.isUserConfigured')) {
      this.transitionTo('getstarted');
    } else {
      this.transitionTo('app');
    }
  }
});
