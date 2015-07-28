import Ember from 'ember';

export default Ember.Controller.extend({
  sessionService: Ember.inject.service('session'),
  actions: {
    login(user) {
      this.get('sessionService').authenticateUser(this.get('session'), {
        identification: user.email,
        password: user.password
      });
    }
  }
});
