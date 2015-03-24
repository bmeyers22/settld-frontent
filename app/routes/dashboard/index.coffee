`import Ember from 'ember'`

DashboardIndexRoute = Ember.Route.extend(
  model: ->
    @session.get 'authUser'
  setupController: (controller, model) ->
    controller.set 'model', model
    return
)

`export default DashboardIndexRoute`
