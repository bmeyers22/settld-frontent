`import Ember from 'ember'`

AppRoute = Ember.Route.extend
  beforeModel: (transition) ->
    if !@session.get('authUser')?
      @transitionTo 'login'
    settings = @session.get('userSettings')
    if !settings.get('isUserConfigured')
      transition.abort()
      @transitionTo 'getstarted'
    return
  model: ->
    Ember.Object.create
      authUser: @session.get('authUser')
      currentHome: @session.get('currentHome')


`export default AppRoute`
