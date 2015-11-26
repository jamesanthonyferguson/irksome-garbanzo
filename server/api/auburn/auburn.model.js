'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuburnSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Auburn', AuburnSchema);