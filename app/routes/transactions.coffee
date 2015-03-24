`import Ember from 'ember'`

TransactionsRoute = Ember.Route.extend(setupController: (controller, model) ->
  controllerFeed = @controllerFor('feeds/transactions')
  return
)

`export default TransactionsRoute`
