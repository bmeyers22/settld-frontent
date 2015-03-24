`import Ember from 'ember'`

HomesIndexRoute = Ember.Route.extend(
  model: ->
    @store.all 'home'
  setupController: (controller, model) ->
    controller.set 'model', model
    return
  actions: editHome: (home) ->
    @transitionTo 'homes.edit', home
    return
)

`export default HomesIndexRoute`
