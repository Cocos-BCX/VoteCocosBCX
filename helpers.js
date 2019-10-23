'use strict';

const _ = require('lodash');
const log4js = require('log4js');
const path = require('path');
const mongoose = require('mongoose');


module.exports.initLogger = function (config) {
    log4js.configure(config);
    const logger = log4js.getLogger();
  
    console.debug = logger.trace.bind(logger);
    console.log = logger.debug.bind(logger);
    console.info = logger.info.bind(logger);
    console.warn = logger.warn.bind(logger);
    console.error = logger.error.bind(logger);
};

module.exports.includeAll = function(dirname){
    if(!dirname.startsWith(__dirname))
        dirname = path.join(__dirname, dirname);

    let files = require('include-all')({
        dirname,
        depth: 1,
        filter:  /(.+)\.js$/,
        excludeDirs: /^\.(git|svn)$/
    });
    _.each(files, function(file, filename) {
        if(_.isUndefined(file)) delete files[filename]
    });
    return files
}

exports.createConnectionMongo = async function ({
    host = 'localhost',
    port = 27017,
    database,
    options
  }) {
    const uri = `mongodb://${host}:${port}/${database}`;
    const defaults = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoReconnect: true,
      poolSize: 10
    };
    _.merge(defaults, options);
    return await mongoose.createConnection(uri, defaults);
};