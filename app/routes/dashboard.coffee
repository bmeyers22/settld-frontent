`import Ember from 'ember'`

DashboardRoute = Ember.Route.extend(
  model: ->
    @session.get 'authUser'
  setupController: (controller, model) ->
    controllerFeed = @controllerFor('feeds/dashboard')
    return
)

`export default DashboardRoute`
