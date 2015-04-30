`
import Ember from 'ember'
`

InvoicePayComponent = Ember.Component.extend
  tagName: 'div'
  classNames: ['invoice']
  didInsertElement: ->
  actions:
    close: ->
      @sendAction('close')
    sendPayment: ->
      console.log 'doing some stuff'
      $.ajax
        type: "POST"
        async: false
        url: 'https://sandbox-api.venmo.com/v1/payments?'
        dataType: "json"
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
        error: (data) ->
          console.log data

    markPaid: ->

`export default InvoicePayComponent`
