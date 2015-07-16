import Ember from 'ember';

var Register = Ember.View.extend({
  classNames: [
    'signin-container',
    'register'
  ],
  user: Ember.Object.create({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirm: ''
  }),
  didInsertElement: function() {
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
              first_name: self.get('controller.firstName'),
              last_name: self.get('controller.lastName'),
              email: self.get('controller.email'),
              password: self.get('controller.password'),
              password_confirmation: self.get('controller.passwordConfirm')
            }
          },
          error(response) { (response) => console.log(response); },
          success(response) {
              console.log("SUCCESS", response);
          }
        })
        return;
      },
      onFailure() {
        debugger
      },
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

export default Register
