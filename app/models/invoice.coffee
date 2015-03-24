`import DS from 'ember-data'`

Invoice = DS.Model.extend
  transaction: DS.belongsTo "transaction"
  payer_id: DS.attr "string"
  payee_id: DS.attr "string"
  home_id: DS.attr "string"
  amount: DS.attr 'number'
  date: DS.attr 'date', defaultValue: ->
    new Date
  paid: DS.attr 'boolean'
  payment_date: DS.attr "date"
  payment_method: DS.attr "number"

`export default Invoice`
