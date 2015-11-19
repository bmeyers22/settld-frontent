import HomesJoinController from '../homes/join';

var GetstartedJoinController = HomesJoinController.extend({
  actions: {
    onJoinSuccess(selectedHome) {
      this.store.find('home', selectedHome.get('id')).then( (home) => {
        let settings = this.get('currentSession.userSettings'),
            authUser = this.get('currentSession.authUser');
        this.set('currentSession.currentHome', home);
        this.set('currentSession.CURRENT_HOME_ID', this.get('currentSession.currentHome.id'));
        home.get('users').pushObject(authUser);
        authUser.get('homes').pushObject(home);
        authUser.save();
        home.save();
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
