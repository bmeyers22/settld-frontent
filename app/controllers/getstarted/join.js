import HomesJoinController from '../homes/join';

var GetstartedJoinController = HomesJoinController.extend({
  actions: {
    onJoinSuccess(selectedHome) {
      let self = this;
      this.store.find('home', selectedHome.get('_id')).then(function(home) {
        var settings;
        self.session.set('currentHome', home);
        self.session.set('CURRENT_HOME_ID', self.session.get('currentHome').get('id'));
        home.get('users');
        settings = self.session.get('userSettings');
        settings.set('isGroupConfigured', true);
        settings.set('defaultHome', home.get('id'));
        settings.save().then(function (settings) {
          self.transitionToRoute('app');
        });
      });
    }
  }
});

export default GetstartedJoinController
