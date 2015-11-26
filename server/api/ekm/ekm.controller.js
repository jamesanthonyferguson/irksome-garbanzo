'use strict';

var _ = require('lodash');
var Ekm = require('./ekm.model');
var request = require('request');
// Get list of ekms
exports.index = function(req, res) {
  // Ekm.find(function (err, ekms) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(200).json(ekms);
  // });
};

// Get a single ekm
exports.show = function(req, res) {
  Ekm.findById(req.params.id, function (err, ekm) {
    if(err) { return handleError(res, err); }
    if(!ekm) { return res.status(404).send('Not Found'); }
    return res.json(ekm);
  });
};

// Creates a new ekm in the DB.
exports.create = function(req, res) {
  Ekm.create(req.body, function(err, ekm) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(ekm);
  });
};

// Updates an existing ekm in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ekm.findById(req.params.id, function (err, ekm) {
    if (err) { return handleError(res, err); }
    if(!ekm) { return res.status(404).send('Not Found'); }
    var updated = _.merge(ekm, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(ekm);
    });
  });
};

// Deletes a ekm from the DB.
exports.destroy = function(req, res) {
  Ekm.findById(req.params.id, function (err, ekm) {
    if(err) { return handleError(res, err); }
    if(!ekm) { return res.status(404).send('Not Found'); }
    ekm.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}