`import Ember from 'ember'`

Register = Ember.View.extend
  classNames: [
    'signin-container'
    'login'
  ]
  didInsertElement: ->
    $("#auth-hidden").val($('meta[name="csrf-token"]').attr('content'))
    @$('.ui.form').form 
      first_name:
        identifier: 'user[frst_name]'
        rules: [ {
          type: 'empty'
          prompt: 'Please enter your first name'
        } ]
      email:
        identifier: 'user[email]'
        rules: [ {
          type: 'email'
          prompt: 'Please enter your email'
        } ]
      password:
        identifier: 'user[password]'
        rules: [ {
          type: 'empty'
          prompt: 'Please enter your password'
        } ]
      password_confirm:
        identifier: 'user[password_confirm]'
        rules: [
          {
            type: 'empty'
            prompt: 'Please confirm password'
          }
          {
            type: 'match[user[password]]'
            prompt: 'Passwords must match'
          }
        ]
      terms:
        identifier: 'terms'
        rules: [ {
          type: 'checked'
          prompt: 'You must agree to the terms and conditions'
        } ]
      on: 'change'
      onValid: ->
        @parent().parent().addClass 'valid'
        return
      onSuccess: ->
        # self.$('form').submit();
        return
      onFailure: ->
    setTimeout =>
      @$().addClass 'visible'
    , 200

`export default Register`
