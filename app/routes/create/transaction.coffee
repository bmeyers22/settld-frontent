`import Ember from 'ember'`

CreateTransactionRoute = Ember.Route.extend
  model: ->
    @_$modelDefaults.getModelType "transaction",
      user: @session.get('authUser')
      home: @session.get('currentHome')

`export default CreateTransactionRoute`
