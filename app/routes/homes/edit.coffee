`import Ember from 'ember'`

HomesEditRoute = Em.Route.extend(model: (params) ->
  @store.find 'home', params.id
)

`export default HomesEditRoute`
