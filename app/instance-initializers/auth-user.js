import Ember from 'ember';
import Session from 'web/models/session';

// Takes two parameters: container and app
var initialize = function(instance) {
  var ref;
  var store = instance.container.lookup('service:store');
  var session = instance.container.lookup('session:current');
  if (((((ref = window.currentUserData) != null) ? ref.user : undefined) != null)) {
    var ref;
    var pushData =
      {users: [ currentUserData.user ],
      userSettings: currentUserData.settings,
      userInfos: currentUserData.infos,
      homes: currentUserData.homes};
    store.pushPayload(pushData);
    var user = store.peekRecord('user', currentUserData.user.id);
    var userSettings = store.peekRecord('userSetting', currentUserData.settings[0].id);
    var userInfos = store.peekAll('userInfo');
    user.set('settings', userSettings);
    session.set('authUser', user);
    session.set('CURRENT_USER_ID', user.id);
    session.set('userSettings', user.get('settings'));
    if (userSettings.get('isUserConfigured')) {
      var ref;
      var homes = store.peekAll('home');
      session.set('currentHome', homes.find(function(home) {
        return home.get('id') === userSettings.get('defaultHome');
      }));
      session.set('CURRENT_HOME_ID', session.get('currentHome.id'));
      homes.forEach(function(home) {
        return home.get('users');
      });
      user.set('info', userInfos.get('firstObject'));
      return session.set('userInfo', user.get('info'));
    }
  }
};


var AuthUserInitializer =
  {name: 'auth-user',
  initialize: initialize};

export {initialize}
export default AuthUserInitializer
