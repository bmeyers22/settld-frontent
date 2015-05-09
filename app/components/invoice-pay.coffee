`import Ember from 'ember'`

InvoicePayComponent = Ember.Component.extend
  classNames: ['invoice']
  didInsertElement: ->
  actions:
    close: ->
      @sendAction 'close'
    removeTxn: ->
      @sendAction 'remove', txn
    sendPayment: ->
      invoices = @transactions.map (txn) =>
        txn.getOpenInvoice(@user).get('id')
      $.post '/api/v1/venmo/pay',
        type: "POST"
        payment:
          invoices: invoices
          note: "HEY"
        success: (data) ->
          console.log data
        error: (data) ->
          console.log data

    markPaid: ->

`export default InvoicePayComponent`
