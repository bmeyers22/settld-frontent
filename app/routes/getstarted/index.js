import Ember from 'ember';


var GetstartedIndexRoute = Ember.Route.extend({
  beforeModel(transition) {
    var settings = this.get('session.userSettings');
    if (settings.get('isGroupConfigured')) {
      transition.abort();
      this.transitionTo('app');
    }
  }
});

export default GetstartedIndexRoute
