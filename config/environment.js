/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'web',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {

      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none' 'self'",
      'script-src': "'self' 'localhost' 'unsafe-inline' www.google-analytics.com", 
      'font-src': "'self' fonts.gstatic.com data:", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' ",
      'img-src': "'self'",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com ", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
      'media-src': "'self'"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.PROXY_URL = "localhost:3000"
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.APP.PROXY_URL = "localhost:3000"
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.PROXY_URL = "settld.com"
  }

  return ENV;
};
