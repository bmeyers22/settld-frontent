`import Ember from 'ember'`

InvoicePayComponent = Ember.Component.extend
  classNames: ['invoice']
  didInsertElement: ->
  actions:
    close: ->
      @sendAction('close')
    sendPayment: ->
      console.log 'doing some stuff'
      $.post '/api/v1/venmo/pay',
        type: "POST"
        payment:
          user_id: '145434160922624933'
          note: 'Hey'
          amount: 0.10
        success: (data) ->
          console.log data
        error: (data) ->
          console.log data

    markPaid: ->

`export default InvoicePayComponent`
