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
    torii: {
      providers: {
        'facebook-connect': {
          appId: '808c49a08b28404667651b10612ab69e',
          scope: 'email,user_birthday'
        }
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'self'",
      'script-src': "'self' 'unsafe-inline' sandbox-api.venmo.com www.google-analytics.com connect.facebook.net localhost",
      'font-src': "'self' fonts.gstatic.com data:", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' sandbox-api.venmo.com",
      'img-src': "'self' data:",
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
    ENV.APP.PROXY_URL = "http://localhost:3000/"
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.APP.PROXY_URL = "http://localhost:3000/"
    ENV.baseURL = '/';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.PROXY_URL = "http://settld.com/"
  }

  return ENV;
};
