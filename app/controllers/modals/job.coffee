`import Ember from 'ember'`
`import ModelDefaults from 'web/services/model-defaults'`
`import JobNew from '../jobs/new'`

NewJob = JobNew.extend
  init: ->

    model = @_$modelDefaults.getModelType "job",
      user: @session.get('authUser')
      home: @session.get('currentHome')
      contributors: Ember.A()

    @set 'model', model
    @_super()

  actions:
    submitModal: (txn) ->
      @save @get 'model'

`export default NewJob`
