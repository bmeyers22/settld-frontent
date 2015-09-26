import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [
    'signin-container',
    'login'
  ],
  addErrors(errors) {
    this.$('.ui.form').form('add errors', errors);
  },
  actions: {
    login(provider) {
        if (!provider) {
          if (this.$('.ui.form').form('is valid')) {
            this.get('sessionService').authenticateUser(this.get('session'), {
              identification: this.get('identification'),
              password: this.get('password')
            }).fail( (error) => {
              let errors = [error.error]
              this.addErrors(errors);
            });
          }
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
      }).done( (response) => {
        self.send('login');
        self.sendAction('registered');
      }).fail( (error) => {
        let response = error.responseJSON.errors;
        let errors = [];
        Object.keys(response).forEach((key) => {
          let messages = response[key].map((message) => {
            return `${key[0].toUpperCase()}${key.slice(1)} ${message}`
          })
          errors = errors.concat(messages)
        })

        this.addErrors(errors);
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
