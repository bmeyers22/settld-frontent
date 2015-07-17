import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login() {
      this.get('session').authenticate('simple-auth-authenticator:devise', {
        user: {
          email: this.get('model.email'),
          password: this.get('model.password')
        }
      });
    }
  }
});
