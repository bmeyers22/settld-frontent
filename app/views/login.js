import Ember from 'ember'

var Login = Ember.Component.extend({
  classNames: [
    'signin-container',
    'login'
  ],
  didInsertElement: function() {
    var self = this;
    $("#auth-hidden").val($('meta[name="csrf-token"]').attr('content'));
    // this.$('.ui.form').form({
    //     email: {
    //         identifier: 'user[email]',
    //         rules: [{
    //             type: 'email',
    //             prompt: 'Please enter your email'
    //         }]
    //     },
    //     password: {
    //         identifier: 'user[password]',
    //         rules: [{
    //             type: 'empty',
    //             prompt: 'Please enter your password'
    //         }]
    //     }
    // }, {
    //     on: 'change',
    //     onValid: function() {
    //         this.parent().parent().addClass('valid')
    //     },
    //     onSuccess: function() {
    //         // self.$('form').submit();
    //     },
    //     onFailure: function() {
    //     }
    // });
    this.$('.ui.checkbox').checkbox();
    return setTimeout(() => this.$().addClass('visible', 200));
  }
});

export default Login
