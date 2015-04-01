`import Ember from 'ember'`

HomesEditRoute = Ember.Route.extend(model: (params) ->
  @store.find 'home', params.id
)

`export default HomesEditRoute`
