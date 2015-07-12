import Ember from 'ember'

var Register = Ember.View.extend({
  classNames: [
    'signin-container',
    'login'
  ],
  didInsertElement: function() {
    $("#auth-hidden").val($('meta[name="csrf-token"]').attr('content'));
    this.$('.ui.form').form({
      first_name:
        {identifier: 'user[frst_name]',
        rules: [ {
          type: 'empty',
          prompt: 'Please enter your first name'
        } ]},
      email:
        {identifier: 'user[email]',
        rules: [ {
          type: 'email',
          prompt: 'Please enter your email'
        } ]},
      password:
        {identifier: 'user[password]',
        rules: [ {
          type: 'empty',
          prompt: 'Please enter your password'
        } ]},
      password_confirm:
        {identifier: 'user[password_confirm]',
        rules: [
          {
            type: 'empty',
            prompt: 'Please confirm password'
          },
          {
            type: 'match[user[password]]',
            prompt: 'Passwords must match'
          }
        ]},
      terms:
        {identifier: 'terms',
        rules: [ {
          type: 'checked',
          prompt: 'You must agree to the terms and conditions'
        } ]},
      on: 'change',
      onValid: function() {
        this.parent().parent().addClass('valid');
        return;
      },
      onSuccess: function() {
        // self.$('form').submit();
        return;
      },
      onFailure: function() {}
    });
    return setTimeout(() => this.$().addClass('visible', 200));
  }
});

export default Register
