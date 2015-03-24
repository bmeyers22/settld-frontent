`import Ember from 'ember'`
`import Enums from '../enums'`

# Takes two parameters: container and app
initialize = (container, application) ->
  application.register 'enums:default', Enums, instantiate: false
  application.inject 'controller', 'Enums', 'enums:default'
  application.inject 'route', 'Enums', 'enums:default'

EnumsInitializer =
  name: 'enums'
  after: 'store'
  initialize: initialize

`export {initialize}`
`export default EnumsInitializer`

