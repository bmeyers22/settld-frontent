`import Ember from 'ember'`

AppRoute = Ember.Route.extend
  beforeModel: (transition) ->
    if !@session.get('authUser')?
      transition.abort()
      @transitionTo 'login'
    else if !@session.get('userSettings.isUserConfigured')
      transition.abort()
      @transitionTo 'getstarted'
    else
      @transitionTo 'dashboard'
  model: ->
    Ember.Object.create
      authUser: @session.get('authUser')
      currentHome: @session.get('currentHome')


`export default AppRoute`
