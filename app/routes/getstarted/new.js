import Ember from 'ember';


var GetstartedNewRoute = Ember.Route.extend({
  actions: {
    cancelCreate: function(home) {
      this.transitionTo('getstarted');
    },
    saveHome: function(home) {
      let settings = this.session.get('userSettings'),
        self = this;
      settings.set('isUserConfigured', true);
      settings.set('defaultHome', home.get('id'));
      settings.save().then( function (settings) {
        self.transitionTo('app');
      });
      this.session.set('currentHome', home);
      this.session.set('CURRENT_HOME_ID', home.get('id'));

    }
  }
});

export default GetstartedNewRoute
