`import Ember from 'ember'`
`import ModelDefaults from 'web/services/model-defaults'`
`import TransactionsNew from '../transactions/new'`

NewTransaction = TransactionsNew.extend
  init: ->
    # contributors = Ember.A()
    # currentUser = 
    # currentHome = 
    # retProm = new Ember.RSVP.Promise (resolve, reject) =>
    #   users = @session.get('currentHome.users').then (users) =>
    #     len = users.get('length')
    #     users.forEach (user) ->
    #       contributors.pushObject user unless user is currentUser
            

    model = @_$modelDefaults.getModelType "transaction",
          user: @session.get('authUser')
          home: @session.get('currentHome')

    @set 'model', model
    @_super()

  actions: 
    submitModal: (txn) ->
      @save @get 'model'

`export default NewTransaction`