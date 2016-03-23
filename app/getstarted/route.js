import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    var settings = this.get('currentSession.userSettings');
    if (settings.get('isGroupConfigured')) {
      transition.abort();
      this.transitionTo('app');
    }
  }
});
