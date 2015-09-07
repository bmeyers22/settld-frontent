import Ember from 'ember';
// `import io from 'web/utils/socket.io'`;
var Client = null;
var initialize = function(registry, application) {
  Client = function() {
    this.init = function() {
      this.socket = io.connect('localhost:3001');
      return this.createListeners();
    };

    this.createListeners = function() {
      var store = instance.container.lookup('service:store');
      var socket = this.socket;
      socket.on('user_data_push', function(data) {
        return console.log(data);
      });
      return socket.on('transaction-message', function(data) {
        return store.pushPayload('transaction', data);
      });
    };

    return this.init();
  };
  return new Client();
};

var SocketInitializer =
  {name: 'socket-initializer',
  after: 'store',
  initialize() {}};

export {Client}
export {initialize}
export default SocketInitializer
