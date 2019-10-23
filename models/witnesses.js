'use strict';

const {Schema} = require('mongoose');

const schema = new Schema({
    createdAt: {
        type : 'date',
        default: Date.now,
    },

    updatedAt: {
        type : 'date'
    },
});

schema.set("timestamps", true);

module.exports = schema;