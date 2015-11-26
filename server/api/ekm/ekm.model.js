'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EkmSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Ekm', EkmSchema);