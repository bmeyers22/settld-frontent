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
    torii: { },
    'simple-auth': {
      authenticationRoute: 'login',
      authorizer: 'simple-auth-authorizer:devise'
    },
    pace: {
      // addon-specific options to configure theme
      theme: 'minimal',
      color: 'green',

      // pace-specific options
      // learn more on http://github.hubspot.com/pace/#configuration
      catchupTime: 50,
      initialRate: .01,
      minTime: 100,
      ghostTime: 50,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: true,
      restartOnPushState: true,
      restartOnRequestAfter: 500,
      target: 'body',
      elements: {
        checkInterval: 100,
        selectors: ['body', '.ember-view']
      },
      eventLag: {
        minSamples: 10,
        sampleCount: 3,
        lagThreshold: 3
      },
      ajax: {
        trackMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        trackWebSockets: true,
        ignoreURLs: []
      }
    },
    APP: {
      MOBILE_APP: false
    },
    contentSecurityPolicy: {
      'default-src': "'self'",
      'script-src': "'self' 'unsafe-inline' https://d37gvrvc0wt4s1.cloudfront.net sandbox-api.venmo.com www.google-analytics.com connect.facebook.net localhost",
      'font-src': "'self' fonts.gstatic.com data:", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' sandbox-api.venmo.com",
      'img-src': "'self' data: venmopics.appspot.com",
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
    ENV.torii.providers = {
      'facebook-oauth2': {
        apiKey: process.env['FACEBOOK_APP_ID_SETTLD_TEST'],
        scope: 'user_birthday, user_location, user_about_me, email, public_profile'
      },
      'venmo-oauth2': {
        apiKey: process.env['VENMO_APP_ID_SETTLD_TEST'],
        scope: 'access_email, access_phone, access_profile, make_payments'
      }
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.APP.PROXY_URL = "http://localhost:3000/";
    ENV.baseURL = '/';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.PROXY_URL = "http://app.settld.com/";
    ENV.torii.providers = {
      'facebook-oauth2': {
        apiKey: process.env['FACEBOOK_APP_ID_SETTLD'],
        scope: 'user_birthday, user_location, user_about_me, email, public_profile'
      },
      'venmo-oauth2': {
        apiKey: process.env['VENMO_APP_ID_SETTLD'],
        scope: 'access_email, access_phone, access_profile, make_payments'
      }
    }
  }

  return ENV;
};
