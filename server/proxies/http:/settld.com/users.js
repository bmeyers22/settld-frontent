// config from './config/environment'
var proxyPath = '/users';

module.exports = function(app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  if (app.settings.env == "production") {
    PROXY_URL = "settld.com";
  } else {
    PROXY_URL = "localhost:3000";
  }
  var proxy = require('http-proxy').createProxyServer({});

  proxy.on('error', function(err, req) {
    console.error(err, req.url);
  });

  app.use(proxyPath, function(req, res, next){
    // include root path in proxied request
    req.url = proxyPath + '/' + req.url;
    proxy.web(req, res, { target: 'http://' + PROXY_URL });
  });
};
