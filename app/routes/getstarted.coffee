`import Ember from 'ember'`

GetstartedRoute = Ember.Route.extend(beforeModel: (transition) ->
  settings = @session.get('userSettings')
  if settings.get('isUserConfigured')
    transition.abort()
    @transitionTo 'dashboard'
  return
)

`export default GetstartedRoute`
