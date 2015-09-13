export function initialize(application) {
  var applicationRoute = application.container.lookup('route:application');
  var session          = application.container.lookup('simple-auth-session:main');
  var store          = application.container.lookup('store:main');
  // handle the session events
  session.on('sessionAuthenticationSucceeded', function() {
    applicationRoute.transitionTo('app');
  });
  session.on('sessionAuthenticationFailed', function() {
    console.log("Authentication Failed");
  });
  session.on('sessionInvalidationSucceeded', function() {
    applicationRoute.transitionTo('login');
  });

}

export default {
  name: 'authentication',
  initialize: initialize
};
