`import Ember from 'ember'`

MissingRoute = Ember.Route.extend(redirect: (param) ->
  console.log 'No Route for given URL found. Will transition to Index Route instead.'
  @transitionTo 'index'
  return
)

`export default MissingRoute`
