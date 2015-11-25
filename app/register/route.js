import Ember from 'ember';

export default Ember.Route.extend({
  currentSession: Ember.inject.service(),
  model() {
    return this.get('currentSession.authUser');
  },
  actions: {
    updateName(name) {
      let names = name.split(" "),
        self = this;
      if (names[0]) {
        this.set('currentModel.firstName', names[0])
      }
      if (names[1]) {
        this.set('currentModel.lastName', names[1])
      }
      this.get('currentModel').save().then( (user) => {
        if (this.get('currentModel').isValid) {
          self.transitionTo('register.payment')
        }
      })
    },
    connectVenmo() {
      let session = this.get('session');
      this.get('torii').open("venmo-oauth2").then((data) => {
        return this.get('currentSession').linkVenmo(data);
      }).then( () => {
        this.send('finish');
      })
    },
    setUserConfigured() {
      let settings = this.get('currentSession.userSettings');
      this.set('currentSession.userSettings.isUserConfigured', true);
      settings.save();
      this.transitionTo('getstarted');
    },
    finish() {
      this.send('setUserConfigured')
    }
  }
});
