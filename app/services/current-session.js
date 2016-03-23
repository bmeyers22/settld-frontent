import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Service.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    linkVenmo(data) {
        return Ember.$.post(`${config.API_URL}venmo/link`, {
            data: {
                userId: this.get('authUser.id'),
                authData: JSON.parse(localStorage.getItem('firebase:session::settld-dev')),
                data: data
            }
        });
    },
    invalidateSession() {
        this.get('session').close();
    },
    refresh() {
        return this.initializeUser(this.get('session'), this.get('store'));
    },
    getSessionData(session) {
        let pArray = []
        return this.get('store').query('user', {orderBy: 'uid', equalTo: session.get('uid')}).then( (users) => {
            if (users.get('length') > 0) {
                return users.get('firstObject');
            } else {
                return null;
            }
        }).then ( (user) => {
            if (user) {
                pArray.push(this.get('store').query('userSetting', {orderBy: 'user', equalTo: user.get('id')}));
                pArray.push(user.get('homes'));
                return Promise.all(pArray).then( (responses) => {
                    let settings = responses[0],
                        homes = responses[1],
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
                        this.get('currentHome.groupInfo').then((info) => {
                            this.set('currentHomeInfo', info);
                        })
                    }
                    return this;
                });
            } else {
                return this.invalidateSession();
            }

        })
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
