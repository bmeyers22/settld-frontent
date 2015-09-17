export function initialize(registry, application) {
  application.inject('controller', 'websockets', 'service:websockets');
}

export default {
  name: 'websocket',
  after: 'store',
  initialize: initialize
};
