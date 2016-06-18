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
    firebase: 'https://YOUR-FIREBASE-NAME.firebaseio.com/',
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
            }
        },
        torii: {
            sessionServiceName: 'session'
        },
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
            'connect-src': "'self' http://localhost:3000 https://settld-dev.firebaseio.com https://auth.firebase.com wss://*.firebaseio.com sandbox-api.venmo.com https://api.rollbar.com ws://localhost:7000 https://www.google-analytics.com http://www.google-analytics.com",
            'img-src': "'self' data: venmopics.appspot.com https://www.google-analytics.com http://www.google-analytics.com https://fbcdn-profile-a.akamaihd.net",
            'style-src': "'self' 'unsafe-inline' fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com",
            'media-src': "'self'"
        },
        cordova: {
            rebuildOnChange: false,
            emulate: false
        }
    };

    if (environment === 'development') {
        ENV.GA = {
            UA_CODE: 'UA-51059302-1' // where UA code looks something like: UA-00000000-1
        }
        ENV.firebase = process.env['FIREBASE_URL_DEV'];

        // ENV.APP.LOG_RESOLVER = true;
        ENV.APP.LOG_ACTIVE_GENERATION = true;
        ENV.APP.LOG_TRANSITIONS = true;
        ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        ENV.APP.LOG_VIEW_LOOKUPS = false;
        ENV.PROXY_URL = ''
        ENV.torii.providers = {
            'facebook': {
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
        ENV.APP.rootElement = '#application';
        ENV.API_URL = 'http://localhost:3000/'
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

    if (environment === 'production' || environment === 'prod') {
        ENV.GA = {
            UA_CODE: 'UA-51059302-1' // where UA code looks something like: UA-00000000-1
        }
        ENV.firebase = process.env['FIREBASE_URL'];
        ENV.API_URL = '';
        ENV.torii.providers = {
            'facebook': {
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
        ENV.APP.rootElement = '#application';
        ENV.production = true;
    }

    return ENV;
};
