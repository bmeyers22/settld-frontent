`import DS from 'ember-data'`

Invoice = DS.Model.extend
  transaction: DS.belongsTo "transaction"
  payerId: DS.attr "string"
  payeeId: DS.attr "string"
  homeId: DS.attr "string"
  amount: DS.attr 'number'
  date: DS.attr 'date', defaultValue: ->
    new Date()
  paid: DS.attr 'boolean'
  paymentDate: DS.attr "date"
  paymentMethod: DS.attr "number"

`export default Invoice`
