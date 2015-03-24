`import Ember from 'ember'`

Register = Ember.Route.extend
  beforeModel: (transition) ->
    if @session.get('authUser')?
      @transitionTo 'app'

`export default Register`
