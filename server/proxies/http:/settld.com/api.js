var proxyPath = '/api';

module.exports = function(app) {
  if (app.settings.env == "production") {
    PROXY_URL = "settld.com";
  } else {
    PROXY_URL = "localhost:3000";
  }
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
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
