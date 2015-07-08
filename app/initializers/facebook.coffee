`import Ember from 'ember'`
`import {Client} from './socket-client'`

initialize = (registry, application) ->
  # application.ready = ->
  # # Load the SDK asynchronously
  # # Here we run a very simple test of the Graph API after login is successful.
  # # This testAPI() function is only called in those cases.
  #
  # testAPI = ->
  #   console.log 'Welcome!  Fetching your information.... '
  #   FB.api '/me', (response) ->
  #     console.log 'Good to see you, ' + response.name + '.'
  #     return
  #   return
  #
  # ((d) ->
  #   js = undefined
  #   id = 'facebook-jssdk'
  #   ref = d.getElementsByTagName('script')[0]
  #   if d.getElementById(id)
  #     return
  #   js = d.createElement('script')
  #   js.id = id
  #   js.async = true
  #   js.src = '//connect.facebook.net/en_US/all.js'
  #   ref.parentNode.insertBefore js, ref
  #   return
  # ) document
  # Initialize Modules Here

Facebook =
  name: 'facebook-auth'
  after: 'store'
  initialize: ->

`export {initialize}`
`export default Facebook`
