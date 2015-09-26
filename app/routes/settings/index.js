
import Ember from 'ember';


var SettingsIndexRoute = Ember.Route.extend({
  model() {
    return this.session.get('authUser');
  }
});

export default SettingsIndexRoute
