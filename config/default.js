'use strict';

var logLevel = 'trace'

module.exports = {
    port: 80,

    tradesLength: 1000,
    log4js: {
        appenders: {
          console: {
            type: 'console',
          },
          file: {
            "type": "dateFile",
            "filename": "./logs/daily",
            "alwaysIncludePattern": true,
            "pattern": ".yyyy-MM-dd.log"
          }
        },
        categories: {
          default: {
            appenders: ['console', 'file'],
            level: logLevel,
          },
        },
      },
    mongo: {
        host: process.env.MONGO_HOST || 'localhost',
        port: parseInt(process.env.MONGO_PORT || 28017),
        database: 'cocosbcx',
        options: {
          user: process.env.MONGO_USERNAME || '',
          pass: process.env.MONGO_PASSWORD || '',
        },
      },
};
