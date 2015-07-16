import Ember from 'ember';

var Login = Ember.Component.extend({
  classNames: [
    'signin-container',
    'login'
  ],
  didInsertElement: function() {
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

export default Login
