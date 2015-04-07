`import Ember from 'ember'`

SettingsIndexController = Ember.Controller.extend(
  dataGroups:
    info: [
      'firstName'
      'lastName'
      'email'
    ]
    password: [
      'current_password'
      'password'
      'password_confirmation'
    ]
  needs: 'application'
  current_password: ''
  password: ''
  password_confirmation: ''
  actions:
    changePassword: (user) ->
      user.save()
      return
    makePayment: ->
      console.log 'doing some stuff'
      $.ajax 'https://sandbox-api.venmo.com/v1/payments',
        type: 'post'
        async: false
        dataType: 'json'
        crossDomain: true
        data:
          access_token: 'gQvqkMKCv5Y87sQ3AdxNdxnGysZDVkVu'
          user_id: '145434160922624933'
          email: 'venmo@venmo.com'
          phone: '15555555555'
          note: 'Hey'
          amount: 0.10
        success: (data) ->
          console.log data
          return
        error: (data) ->
          console.log data
          return
      return
)

`export default SettingsIndexController`
