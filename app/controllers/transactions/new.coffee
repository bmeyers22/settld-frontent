`import Ember from 'ember'`
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
    if copy.get('split')
      copy.set 'contributors', Ember.A()
      copy.get("home.users").forEach (user) ->
        copy.get('contributors').pushObject user.get('id') unless user is copy.get "user"
      copy.save()
    else
      copy.save()
)

`export default TransactionsNewController`
