`import Ember from 'ember'`

InvoiceActionController = Ember.Controller.extend
  transactions: Ember.A()

  addTransaction: (txn) ->
    if not @transactions.contains txn and txn.getOpenInvoice @session.get 'authUser'
      @transactions.addObject txn unless @transactions.contains txn

  removeTransaction: (txn) ->
    @transactions.removeObject txn


`export default InvoiceActionController`
