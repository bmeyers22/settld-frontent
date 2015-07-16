import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel(transition) {
    this._super(transition);
    if (!this.session.get('isAuthenticated')) {
      this.transitionTo('login');
    } else {
      if (!this.initializeUser(this.session.get('secure.raw_user'))) {
        return this.transitionTo('getStarted');
      } else if (/^index/.test(transition.targetName)) {
        this.transitionTo('dashboard', this.store.peekAll('home').indexOf(this.session.get('currentHome')));
      }
    }
  },
  initialized: false,
  initializeUser(current, transition) {
    if (this.get('initialized')) return;
    let session = this.session;
    let store = this.store;
    // Make deep copy so we dont change the session object
    let pushData = $.extend(true, {}, {
      users: [ current.user ],
      userSettings: current.settings,
      userInfos: current.infos,
      homes: current.homes
    });
    // Create objects in store from raw data so they are normalized
    store.pushPayload(pushData);
    let user = store.peekRecord('user', current.user._id);
    let userSettings = store.peekRecord('userSetting', current.settings[0]._id);
    let userInfos = store.peekAll('userInfo');
    user.set('settings', userSettings);
    session.set('authUser', user);
    session.set('CURRENT_USER_ID', user.id);
    session.set('userSettings', user.get('settings'));
    let configured = userSettings.get('isUserConfigured')
    if (configured) {
      let homes = store.peekAll('home');
      session.set('currentHome', homes.find(function(home) {
        return home.get('id') === userSettings.get('defaultHome');
      }));
      session.set('CURRENT_HOME_ID', session.get('currentHome.id'));
      homes.forEach(function(home) {
        return home.get('users');
      });
      user.set('info', userInfos.get('firstObject'));
      session.set('userInfo', user.get('info'));
    }
    return configured;
  }
});
