import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [
    'signin-container',
    'login'
  ],
  actions: {
    login(provider) {
      if (!provider) {
        this.get('sessionService').authenticateUser(this.get('session'), {
          identification: this.get('identification'),
          password: this.get('password')
        });
      } else {
        this.sendAction('login', provider);
      }
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
        self.send('login');
        self.sendAction('registered');
      }).fail(function (error) {
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
