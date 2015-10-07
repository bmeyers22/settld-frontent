var os     = require('os');
var ifaces = os.networkInterfaces();

var addresses = [];
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details){
    if(details.family === 'IPv4' && details.address !== '127.0.0.1') {
      addresses.push(details.address);
    }
  });
}
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
    torii: {},
    'simple-auth': {
      authenticationRoute: 'login',
      authorizer: 'simple-auth-authorizer:devise'
    },
    'simple-auth-devise': {},
    pace: {
      // addon-specific options to configure theme
      theme: 'minimal',
      color: 'green',
    },
    APP: {
      MOBILE_APP: false
    },
    contentSecurityPolicy: {
      'default-src': "'self'",
      'script-src': "'self' 'unsafe-inline' https://d37gvrvc0wt4s1.cloudfront.net sandbox-api.venmo.com https://www.google-analytics.com/analytics.js http://www.google-analytics.com/analytics.js connect.facebook.net localhost",
      'font-src': "'self' fonts.gstatic.com data: fonts.googleapis.com", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' sandbox-api.venmo.com https://api.rollbar.com ws://localhost:7000 https://www.google-analytics.com http://www.google-analytics.com",
      'img-src': "'self' data: venmopics.appspot.com https://www.google-analytics.com http://www.google-analytics.com https://fbcdn-profile-a.akamaihd.net",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com ', // Allow inline styles and loaded CSS from http://fonts.googleapis.com",
      'media-src': "'self'"
    }
  };

  if (environment === 'development') {
    ENV.GA = {
      UA_CODE: 'UA-51059302-1' // where UA code looks something like: UA-00000000-1
    }

    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.PROXY_URL = ''
    ENV['simple-auth']['serverTokenEndpoint'] = '/users/sign_in';
    ENV['simple-auth-devise']['serverTokenEndpoint'] = '/users/sign_in';
    ENV.torii.providers = {
      'facebook-oauth2': {
        apiKey: process.env['FACEBOOK_APP_ID_SETTLD_TEST'],
        scope: 'user_birthday, user_location, user_about_me, email, public_profile',
        redirectUri: 'http://localhost:4200/login'
      },
      'venmo-oauth2': {
        apiKey: process.env['VENMO_APP_ID_SETTLD_TEST'],
        redirectUri: 'http://localhost:4200/register',
        scope: 'access_email, access_phone, access_profile, make_payments'
      }
    }
    ENV.development = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.PROXY_URL = '';
    ENV.baseURL = '/';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.GA = {
      UA_CODE: 'UA-51059302-1' // where UA code looks something like: UA-00000000-1
    }
    ENV.PROXY_URL = '';
    ENV['simple-auth']['serverTokenEndpoint'] = ENV.PROXY_URL + '/users/sign_in';
    ENV['simple-auth-devise']['serverTokenEndpoint'] = ENV.PROXY_URL + '/users/sign_in';
    ENV.torii.providers = {
      'facebook-oauth2': {
        apiKey: process.env['FACEBOOK_APP_ID_SETTLD'],
        scope: 'user_birthday, user_location, user_about_me, email, public_profile',
        redirectUri: 'http://app.settld.com/login',
      },
      'venmo-oauth2': {
        apiKey: process.env['VENMO_APP_ID_SETTLD'],
        scope: 'access_email, access_phone, access_profile, make_payments',
        redirectUri: 'http://app.settld.com/register',
      }
    }
    ENV.production = true;
  }

  return ENV;
};
