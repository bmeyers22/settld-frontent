`import Ember from 'ember'`
# `import io from 'web/utils/socket.io'`
Client = null
initialize = (registry, application) ->
  Client = ->
    @init = ->
      @socket = io.connect('localhost:3001')
      @createListeners()

    @createListeners = ->
      store = instance.container.lookup('service:store')
      socket = @socket
      socket.on 'user_data_push', (data) ->
        console.log data
      socket.on 'transaction-message', (data) ->
        store.pushPayload 'transaction', data

    @init()
  return new Client()

SocketInitializer =
  name: 'socket-initializer'
  after: 'store'
  initialize: ->

`export {Client}`
`export {initialize}`
`export default SocketInitializer`
