`
import Ember from 'ember'
import DS from 'ember-data'
import Enums from 'web/enums'
`

Transaction = DS.Model.extend
  invoices: DS.hasMany "invoice", async: false
  user: DS.belongsTo('user')
  home: DS.belongsTo('home')
  cost: DS.attr('number')
  title: DS.attr('string')
  description: DS.attr('string')
  category: DS.attr('number')
  categoryName: (->
    Enums.TransactionCategories[@get('category')]
  ).property('category')
  date: DS.attr('date', defaultValue: ->
    new Date()
  )
  fuzzyDate: (->
    moment(@get('date')).fromNow()
  ).property('date')
  split: DS.attr('boolean')
  points: DS.attr('number')
  getOpenInvoice: (user) ->
    @get('invoices').find (inv, index, arr) =>
      user.get('id') is inv.get 'payerId'

`export default Transaction`
