import Ember from 'ember';

var Login = Ember.Route.extend({
  currentSession: Ember.inject.service(),
  beforeModel(transition) {
    if (this.get('currentSession.isAuthenticated')) {
      this.transitionTo('index');
    }
  },
  actions: {
    registered(user) {
      this.store.createRecord('user', user).save().then( (user) => {
        return this.store.createRecord('userSetting', {
          user: user
        }).save();
      }).then( (data) => {
        return this.store.createRecord('userInfo', {
          user: user
        }).save();
      }).then( () => {
        this.transitionTo('register.name');
      })
    },
    signIn(provider, loginInfo) {
      let data = { provider: provider };
      if (loginInfo) {
        $.extend(data, loginInfo);
      }
      this.get('session').open("firebase", data).then( (data) => {
        if (provider !== 'password') {
          this.get('store').query('user', {orderBy: 'uid', startAt: data.uid, endAt: data.uid}).then( (users) => {
            if (users.get('length') > 0) {
              this.transitionTo('index');
            } else {
              this.send('registered', {
                uid: data.uid
              });
            }
          })
        } else {
          this.transitionTo('index');
        }
      });
    },
    signOut: function() {
      this.get('session').close();
    }

  }
});

export default Login
