import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  authenticateUser(session, authData) {
    if (authData.provider) {
      authData.provider = authData.provider.replace('-oauth2', '');
      return session.authenticate('authorizer:social', {
        provider: authData.provider,
        credentials: {
          token: authData.authorizationCode
        }
      });
    } else {
      return session.authenticate('simple-auth-authenticator:devise', authData);
    }
  },
  invalidateSession() {
    this.get('session').close();
  },
  refresh() {
    return this.initializeUser(this.get('session'), this.get('store'));
  },
  getSessionData(session) {
    let pArray = []
    debugger
    pArray.push(this.get('store').query('user', { uid: session.get('uid') }));
    pArray.push(this.get('store').query('userInfo', { user: session.get('uid') }));
    pArray.push(this.get('store').query('userSetting', { user: session.get('uid') }));
    pArray.push(this.get('store').query('home', { user: session.get('uid') }));
    return Promise.all(pArray).then( (responses) => {
      let users = responses[0],
        infos = responses[1],
        settings = responses[2],
        homes = responses[3];

      if (users.get('length') > 0) {
        let user = users.get('firstObject'),
          userSettings = settings.get('firstObject');
        this.set('authUser', user);
        user.set('settings', userSettings);
        this.set('CURRENT_USER_ID', user.id);
        this.set('userSettings', user.get('settings'));
        let groupConfigured = userSettings.get('isGroupConfigured')
        if (groupConfigured) {
          this.set('currentHome', homes.find(function(home) {
            return home.get('id') === userSettings.get('defaultHome');
          }));
          this.set('CURRENT_HOME_ID', this.get('currentHome.id'));
          homes.forEach(function(home) {
            return home.get('users');
          });
          user.set('info', infos.get('firstObject'));
          this.set('userInfo', user.get('info'));
        }
        return this;
      } else {
        return this.invalidateSession();
      }
    });
  },
  initializeUser() {
    // Make deep copy so we dont change the session object
    return this.getSessionData(this.get('session'));
    // return data.then(function (data) {
    //   // data stored in raw_data
    //   let current = data.raw_data,
    //     pushData = $.extend(true, {}, {
    //       'users': [ current.user ],
    //       'user-settings': current.settings,
    //       'user-infos': current.infos,
    //       'homes': current.homes
    //     });
    //   // Create objects in store from raw data so they are normalized
    //   store.pushPayload(pushData);
  }
});
