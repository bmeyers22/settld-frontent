import $ from 'jquery';

export function initialize(application) {
  let session = application.container.lookup('simple-auth-session:main');
  let sessionService = application.container.lookup('service:session');
  if (session.get('isAuthenticated')) {
    sessionService.initializeUser(session, application.container.lookup('service:store'));
  }
}

export default {
  name: 'session',
  initialize: initialize
};
