`import Ember from 'ember'`
# `import io from 'frontend/utils/socket.io'`
Client = null
initialize = (container, application) ->
  Client = ->
    @init = ->
      @socket = io.connect('localhost:3001')
      @createListeners()

    @createListeners = ->
      store = container.lookup('store:main')
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