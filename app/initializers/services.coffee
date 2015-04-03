`import Ember from 'ember'`

initialize = (container, application) ->
  application.inject 'controller', '_$modelDefaults', 'service:modelDefaults'
  application.inject 'route', '_$modelDefaults', 'service:modelDefaults'

ServicesInitializer =
  name: 'services'
  after: 'store'
  initialize: initialize

`export {initialize}`
`export default ServicesInitializer`
