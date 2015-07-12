
import Ember from 'ember'


var SettingsIndexRoute = Ember.Route.extend(
  {model: function() {
    return this.session.get('authUser');
  }}
);

export default SettingsIndexRoute
