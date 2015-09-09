import Ember from 'ember';

var Register = Ember.Route.extend({
  model() {
    return this.session.get('authUser');
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
      this.get('currentModel').save().then(function () {
        self.transitionTo('register.payment')
      })
    },
    setUserConfigured() {
      let settings = this.get('session.userSettings');
      this.set('session.userSettings.isUserConfigured', true);
      settings.save();
      this.transitionTo('app');
    },
    finish() {

    }
  }
});

export default Register
