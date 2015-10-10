import Ember from 'ember';

var Login = Ember.Route.extend({
  beforeModel(transition) {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('index');
    }
  },
  actions: {
    registered(user) {
      debugger
      this.store.createRecord('user', user).save().then( () => {
        this.transitionTo('register.name');
      })
    },
    signIn(provider, loginInfo) {
      let data = { provider: provider };
      if (data) {
        $.extend(data, loginInfo);
      }
      this.get("session").open("firebase", data).then(function(data) {
        console.log(data.currentUser);
      });
    },
    signOut: function() {
      this.get("session").close();
    }

  }
});

export default Login
