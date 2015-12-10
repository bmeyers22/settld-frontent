import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Component.extend({
  firebase: Ember.inject.service(),
  classNames: [
    'signin-container',
    'login'
  ],
  addErrors(errors) {
    this.$('.ui.form').form('add errors', errors);
  },
  actions: {
    signIn(provider) {
      let data;
      if (provider === 'password') {
        data = {
          email: this.get('identification'),
          password: this.get('password')
        };
      }
      this.sendAction('signIn', provider, data);
    },
    register() {
      let self = this;
      let ref = new Firebase(config.firebase);
      ref.createUser({
        email    : self.get('identification'),
        password : self.get('password')
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          self.sendAction('registered', userData, {
              email    : self.get('identification'),
              password : self.get('password')
          });
        }
      });
    }
  },
  didRender() {
    var self = this;
    this.$('.ui.form').form({
      on: 'submit',
      inline: true,
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
      },
      onSuccess() {
        self.sendAction('login');
      }
    });
  }
});
