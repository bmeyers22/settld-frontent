import Ember from 'ember';

var GetstartedJoinController = Ember.Controller.extend({
  actions: {
    onJoinSuccess(selectedHome) {
      this.store.find('home', selectedHome.get('id')).then( (home) => {
        let settings = this.get('currentSession.userSettings'),
            authUser = this.get('currentSession.authUser');
        this.set('currentSession.currentHome', home);
        this.set('currentSession.CURRENT_HOME_ID', this.get('currentSession.currentHome.id'));
        home.get('users').pushObject(authUser);
        home.get('groupInfo').then((info) => {
            info.set(`users.${this.get('currentSession.authUser.id')}`, {
                score: 0,
                balance: 0,
                choresToDo: 0
            });
            return info.save();
        })
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
