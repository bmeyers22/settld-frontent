`import Ember from 'ember'`

SettingsIndexRoute = Em.Route.extend(
  model: ->
    @session.get 'authUser'
)

`export default SettingsIndexRoute`
