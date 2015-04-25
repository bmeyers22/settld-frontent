`
import Ember from 'ember'
`
TransactionsNewController = Ember.Controller.extend(
  needs: 'application'
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
)

`export default TransactionsNewController`
