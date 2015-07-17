import Ember from 'ember';

export default Ember.Service.extend({
  initializeUser(session, store) {
    // Make deep copy so we dont change the session object
    let current = session.get('secure.raw_user');
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
    session.set('initialized', true);
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
  }
});