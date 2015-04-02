module.exports = {
  development: {
    buildEnv: 'development', // Override the environment passed to the ember asset build. Defaults to 'production'
    store: {
      type: 'redis', // the default store is 'redis'
      host: 'localhost',
      port: 6379
    },
    assets: {
      type: 's3', // default asset-adapter is 's3'
      gzip: false, // if undefined or set to true, files are gziped
      gzipExtensions: ['js', 'css', 'svg'], // if undefined, js, css & svg files are gziped
      accessKeyId: 'AKIAITFSMYX27ZPZA67A',
      secretAccessKey: process.env['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'],
      bucket: 'app.dev.settld.com'
    }
  },

  staging: {
    buildEnv: 'staging', // Override the environment passed to the ember asset build. Defaults to 'production'
    store: {
      host: 'localhost',
      port: 6379
    },
    assets: {
      accessKeyId: 'AKIAITFSMYX27ZPZA67A',
      secretAccessKey: process.env['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'],
      bucket: 'app.settld.com'
    }
  },

   production: {
    store: {
      host: 'localhost',
      port: 6379,
    },
    assets: {
      accessKeyId: 'AKIAITFSMYX27ZPZA67A',
      secretAccessKey: process.env['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'],
      bucket: 'app.settld.com'
    }
  }
};
