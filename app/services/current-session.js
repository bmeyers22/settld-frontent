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
  invalidateSession(session) {
    this.get('session').close();
  },
  refresh(session, store) {
    return this.initializeUser(session, store);
  },
  // accessDenied() {
  //   this.transitionTo('login');
  // },
  getSessionData(session) {
    return this.get('store').find('user', { uid: session.get('currentUser.uid') })
      .then( users => {
        if (users.length > 0) {
          this.set('authUser', users.get('firstObject'));
          return this;
        } else {
          debugger
          this.invalidateSession();
        }
      });
  },
  initializeUser(session, store) {
    // Make deep copy so we dont change the session object
    return this.getSessionData(session);
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
    //   let user = store.peekRecord('user', current.user._id);
    //   let userSettings = store.peekRecord('userSetting', current.settings[0]._id);
    //   user.set('settings', userSettings);
    //   session.set('authUser', user);
    //   session.set('CURRENT_USER_ID', user.id);
    //   session.set('userSettings', user.get('settings'));
    //   let groupConfigured = userSettings.get('isGroupConfigured')
    //   session.set('initialized', true);
    //   if (groupConfigured) {
    //     let userInfos = current.infos.map((info) => {
    //       return store.peekRecord('userInfo', info._id);
    //     })
    //     let homes = store.peekAll('home');
    //     session.set('currentHome', homes.find(function(home) {
    //       return home.get('id') === userSettings.get('defaultHome');
    //     }));
    //     session.set('CURRENT_HOME_ID', session.get('currentHome.id'));
    //     homes.forEach(function(home) {
    //       return home.get('users');
    //     });
    //     user.set('info', userInfos.get('firstObject'));
    //     session.set('userInfo', user.get('info'));
    //   }
    //   return session;
    // });
  }
});
