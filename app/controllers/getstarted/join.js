import HomesJoinController from '../homes/join';

var GetstartedJoinController = HomesJoinController.extend({
  actions: {
    onJoinSuccess(selectedHome) {
      this.store.find('home', selectedHome.get('id')).then( (home) => {
        var settings;
        this.set('currentSession.currentHome', home);
        this.set('currentSession.CURRENT_HOME_ID', this.get('currentSession.currentHome.id'));
        home.get('users');
        this.get('currentSession.authUser.homes').pushObject(home);
        this.get('currentSession.authUser').save();
        settings = this.get('currentSession.userSettings');
        settings.set('isGroupConfigured', true);
        settings.set('defaultHome', home.get('id'));
        settings.save().then( (settings) => {
          this.transitionToRoute('app');
        });
      });
    }
  }
});

export default GetstartedJoinController
