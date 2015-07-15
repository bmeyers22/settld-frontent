import Ember from 'ember';

// Takes two parameters: container and app
var initialize = function(registry, application) {
  var APP_ENV = {
    PROXY_URL: application.PROXY_URL,
    LOGIN_URL: `${application.PROXY_URL}login`,
    FACEBOOK_LOGIN_URL: `${application.PROXY_URL}users/auth/facebook`,
    VENMO_LOGIN_URL: `${application.PROXY_URL}users/auth/venmo`,
    LOGOUT_URL: `${application.PROXY_URL}logout`
  };

  application.register('environment:default', APP_ENV, { instantiate: false });
  application.inject('controller', 'APP_ENV', 'environment:default');
  application.inject('route', 'APP_ENV', 'environment:default');
};

var EnvironmentInitializer ={
  name: 'environment',
  after: 'store',
  initialize: initialize
};


export {initialize}
export default EnvironmentInitializer;
