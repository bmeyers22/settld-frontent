export function initialize(container, application) {
  var applicationRoute = container.lookup('route:application');
  var session          = container.lookup('simple-auth-session:main');
  var store          = container.lookup('store:main');
  // handle the session events
  session.on('sessionAuthenticationSucceeded', function() {
    container.lookup('service:session').initializeUser(session, store).then(function () {
      applicationRoute.transitionTo('index');
    });
  });
}

export default {
  name: 'authentication',
  after: 'simple-auth',
  initialize: initialize
};
