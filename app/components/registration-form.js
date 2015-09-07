import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [
    'signin-container',
    'register'
  ],
  didInsertElement() {
    self = this;
    $("#auth-hidden").val($('meta[name="csrf-token"]').attr('content'));
    this.$('.ui.form').form({
      on: 'change',
      onSuccess() {
        Ember.$.ajax('/users',{
          method: "POST",
          dataType: "json",
          data: {
            user: {
              first_name: self.get('firstName'),
              last_name: self.get('lastName'),
              email: self.get('email'),
              password: self.get('password'),
              password_confirmation: self.get('passwordConfirm')
            }
          },
          error(response) { response => console.log(response); },
        }).then(function (response) {
          self.sendAction('login', { email: self.get('email'), password: self.get('password') } );
        });
        return;
      },
      onFailure() {},
      fields: {
        firstName: {
          identifier: 'user[first_name]',
          rules: [ {
            type: 'empty',
            prompt: 'Please enter your first name'
          } ]
        },
        email: {
          identifier: 'user[email]',
          rules: [ {
            type: 'email',
            prompt: 'Please enter your email'
          } ]
        },
        password: {
          identifier: 'user[password]',
          rules: [ {
            type: 'empty',
            prompt: 'Please enter your password'
          } ]
        },
        password_confirm: {
          identifier: 'user[password_confirmation]',
          rules: [
            {
              type: 'empty',
              prompt: 'Please confirm password'
            },
            {
              type: 'match[user[password]]',
              prompt: 'Passwords must match'
            }
          ]
        }
      }
    });
  }

});
