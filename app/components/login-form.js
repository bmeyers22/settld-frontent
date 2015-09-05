import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [
    'signin-container',
    'login'
  ],
  actions: {
    authenticate() {
      this.get('sessionService').authenticateUser(this.get('session'), {
        identification: this.get('identification'),
        password: this.get('password')
      });
    },
    facebookLogin() {
      this.get('session').authenticate('simple-auth-authenticator:torii', 'facebook-oauth2');
    }
  },
  didRender() {
    var self = this;
    this.$('.ui.form').form({
      on: 'blur',
      fields: {
        email: {
          identifier: 'identification',
          rules: [{
              type: 'email',
              prompt: 'Please enter your email'
          }]
        },
        password: {
          identifier: 'password',
          rules: [{
              type: 'empty',
              prompt: 'Please enter your password'
          }]
        }
      }
    });
  }
});
