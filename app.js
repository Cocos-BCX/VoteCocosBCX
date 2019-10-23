'use strict';

process.chdir(__dirname);
var express = require('express');
var path = require('path');
var logger = require('morgan');

const _ = require('lodash');
const pkg = require('./package')
const helper = require('./helpers')
const utils = helper.includeAll('utils');

const config = utils.loadConfig();
global.config = config;
helper.initLogger(config.log4js);



(async () => {
    global.Models = {};
    const connection = await helper.createConnectionMongo(config.mongo);
    const schemas = helper.includeAll('./models');
    _.forEach(schemas, (schema, collection) => {
        Models[collection] = connection.model(collection, schema);
    });
})()


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/witnesses');
var usersRouter = require('./routes/committee');
app.use('/api/witnesses', indexRouter);
app.use('/api/committee', usersRouter);

module.exports = app;

if (module.parent) {
    module.exports = app
} else {
    app.listen(config.port, function () {
        console.log(`${pkg.name} listening on port ${config.port}`)
    })
}

