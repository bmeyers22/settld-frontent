`
import Ember from 'ember'
`
TransactionsNewController = Ember.Controller.extend(
  categories: (->
    cats = _.clone(@Enums.TransactionCategories)
    _.sortBy _.map(cats, (name, key) ->
      {
        key: key
        val: name.capitalize()
      }
    ), (e) ->
      e.val[0]
  ).property()
  save: (txn) ->
    copy = @store.createRecord('transaction', txn)
    copy.save()
  actions:
    complete: (txn) ->
      @save @get 'model'

)

`export default TransactionsNewController`
