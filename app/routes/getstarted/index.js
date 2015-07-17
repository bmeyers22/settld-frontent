import Ember from 'ember';


var GetstartedIndexRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var settings = this.get('session.userSettings');
    if (settings.get('isUserConfigured')) {
      transition.abort();
      this.transitionTo('index');
    }
  }
});

export default GetstartedIndexRoute
