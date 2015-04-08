`import Ember from 'ember'`

HomesNewRoute = Ember.Route.extend(
  model: ->
    @store.createRecord 'home'
  setupController: (controller, model) ->
    controller.set 'model', model
    return
  actions:
    cancelCreate: (home) ->
      home.deleteRecord()
      @transitionTo 'homes'
      return
    saveHome: (home) ->
      @transitionTo 'homes'
      return
)

`export default HomesNewRoute`
