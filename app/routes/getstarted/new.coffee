`
import Ember from 'ember'
`

GetstartedNewRoute = Ember.Route.extend(
  model: ->
    @store.createRecord 'home'
  setupController: (controller, model) ->
    controller.set 'model', model
    return
  actions: saveHome: (home) ->
    @transitionTo 'dashboard'
    return
)

`export default GetstartedNewRoute`
