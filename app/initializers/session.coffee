`import Ember from 'ember'`
`import Session from 'web/models/session'`

# Takes two parameters: container and app
initialize = (registry, application) ->
  application.deferReadiness()
  application.register 'session:current', Session, singleton: true
  application.inject 'controller', 'session', 'session:current'
  application.inject 'route', 'session', 'session:current'
  Ember.$.getJSON("/users/current.json").then (current) ->
    window.currentUserData = current
    application.advanceReadiness()


SessionInitializer =
  name: 'session'
  after: 'enums'
  initialize: initialize

`export {initialize}`
`export default SessionInitializer`
