
import Ember from 'ember';


var GetstartedIndexRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var settings = this.session.get('userSettings');
    if (settings.get('isUserConfigured')) {
      transition.abort();
      return this.transitionTo('dashboard');
    }
  }
});

export default GetstartedIndexRoute
