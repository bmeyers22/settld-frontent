`import Ember from 'ember'`
`import Resolver from 'ember/resolver'`
`import loadInitializers from 'ember/load-initializers'`
`import config from './config/environment'`
`import globals from './globals'`

Ember.MODEL_FACTORY_INJECTIONS = true

Roomy = Ember.Application.extend
  modulePrefix: config.modulePrefix
  podModulePrefix: config.podModulePrefix
  Resolver: Resolver
  rootElement: '#application'
  globeController: null

loadInitializers Roomy, config.modulePrefix

# Roomy.ready = ->
#   # Load the SDK asynchronously
#   # Here we run a very simple test of the Graph API after login is successful.
#   # This testAPI() function is only called in those cases.

#   testAPI = ->
#     console.log 'Welcome!  Fetching your information.... '
#     FB.api '/me', (response) ->
#       console.log 'Good to see you, ' + response.name + '.'
#       return
#     return

#   @authUser = null
#   ((d) ->
#     js = undefined
#     id = 'facebook-jssdk'
#     ref = d.getElementsByTagName('script')[0]
#     if d.getElementById(id)
#       return
#     js = d.createElement('script')
#     js.id = id
#     js.async = true
#     js.src = '//connect.facebook.net/en_US/all.js'
#     ref.parentNode.insertBefore js, ref
#     return
#   ) document
#   # Initialize Modules Here
#   # Roomy.socketModule = new (Roomy.SocketModule)
  
`export default Roomy`
