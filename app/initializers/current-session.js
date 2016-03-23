export function initialize(application) {
  if (arguments[1]) { // Ember < 2.1
    application = arguments[1];
  }
  application.inject('route',      'currentSession', 'service:currentSession');
  application.inject('controller', 'currentSession', 'service:currentSession');
}

export default {
  name: 'current-session',
  initialize: initialize
};
