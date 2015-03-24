`import Ember from 'ember'`
TransactionsNewController = Ember.ObjectController.extend(
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
    if !copy.get('split')
      copy.set 'contributors', Ember.A()
      copy.save()
      copy.get("home").forEach (user) ->
        contributors.pushObject user unless user is copy.get "user"
    else
      copy.save()
)

`export default TransactionsNewController`
