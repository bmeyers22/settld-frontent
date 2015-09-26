import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel(transition) {
    var settings = this.get('session.userSettings');
    if (settings.get('isGroupConfigured')) {
      transition.abort();
      this.transitionTo('app');
    }
  }
});
