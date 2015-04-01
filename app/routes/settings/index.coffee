`import Ember from 'ember'`

SettingsIndexRoute = Ember.Route.extend(
  model: ->
    @session.get 'authUser'
)

`export default SettingsIndexRoute`
