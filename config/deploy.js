module.exports = function(environment) {
  var ENV = {};

  if (environment === 'development') {
    ENV.build = {
      environment: 'development'
    };
    ENV.store = {
      host: 'localhost',
      port: 6379
    };

    ENV.assets = {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
      bucket: 'app.dev.settld.com'
    };
  }

  if (environment === 'staging' || environment === 'production') {
    ENV.build = {
      environment: 'production'
    };

    ENV.store = {
      host: 'localhost',
      port: 6379
    };

    ENV.assets = {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
      bucket: 'app.settld.com',
      prefix: '<optional-remote-prefix>'
    };
  }

  return ENV;
}
