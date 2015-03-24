`import Ember from 'ember'`
`import DS from 'ember-data'`
`import Enums from 'frontend/enums'`

Transaction = DS.Model.extend(
  invoices: DS.hasMany "invoice", async: true
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
    new Date
  )
  fuzzyDate: (->
    moment(@get('date')).fromNow()
  ).property('date')
  split: DS.attr('boolean')
  contributors: DS.attr('array')
  points: DS.attr('number'))

`export default Transaction`