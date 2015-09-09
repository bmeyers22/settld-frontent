import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [
    'signin-container',
    'login'
  ],
  actions: {
    authenticate: function(provider) {
      let session = this.get('session');
      session.authenticate('simple-auth-authenticator:torii', provider, function(error) {
        console.log('There was an error when trying to sign you in: ' + error);
      }).then(function (authData) {
        debugger
        console.log(session);
        console.log(authData);
      });
    },
    login() {
      this.get('sessionService').authenticateUser(this.get('session'), {
        identification: this.get('identification'),
        password: this.get('password')
      });
    },
    register() {
      let self = this;
      Ember.$.ajax('/users',{
        method: "POST",
        dataType: "json",
        data: {
          user: {
            email: self.get('identification'),
            password: self.get('password'),
            password_confirmation: self.get('password')
          }
        }
      }).done(function (response) {
        debugger
        self.send('login');
        self.sendAction('registered');
      }).fail(function (error) {
        debugger
        console.log(response);
      });
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
