`import Ember from 'ember'`

Login = Ember.Route.extend
  beforeModel: (transition) ->
    if @session.get('authUser')?
      @transitionTo 'app'

`export default Login`
