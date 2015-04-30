`
import Ember from 'ember'
`

GetstartedIndexRoute = Ember.Route.extend
  beforeModel: (transition) ->
    settings = @session.get('userSettings')
    if settings.get('isUserConfigured')
      transition.abort()
      @transitionTo 'dashboard'

`export default GetstartedIndexRoute`
