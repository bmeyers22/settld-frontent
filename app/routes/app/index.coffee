`import Ember from 'ember'`

AppIndexRoute = Ember.Route.extend(beforeModel: (transition) ->
  @transitionTo 'dashboard'
  return
)

`export default AppIndexRoute`
