'use strict';

var _ = require('lodash');
// var Auburn = require('./auburn.model');
var request = require('request');
// Get list of auburns
// exports.index = function(req, res) {
//   Auburn.find(function (err, auburns) {
//     if(err) { return handleError(res, err); }
//     return res.status(200).json(auburns);
//   });
// };

exports.getCurrentStatus = function (req, res) {
    request('https://api.connectsense.com/v1/3C4E4BCD5E0A4F418D4332265187BA7F/devices', function (err, response, body) {
      if (err)  return res.status(400).send(err);
      res.json(response)
    })
}

exports.getRecentHistory = function (req, res) {
  var data = {};
  request('https://api.connectsense.com/v1/3C4E4BCD5E0A4F418D4332265187BA7F/devices/49C15DTH01', function (err, response, body) {
      if (err) return res.status(400).send(err);
      // data.auburn2 = response;
      // request('https://api.connectsense.com/v1/3C4E4BCD5E0A4F418D4332265187BA7F/devices/49C15DTH01', function (err, response, body) {
        // if (err) res.status(400).send(err);
        data.auburn1 = response;
        res.json(data);
      // })
  })
}
// // Get a single auburn
// exports.show = function(req, res) {
//   Auburn.findById(req.params.id, function (err, auburn) {
//     if(err) { return handleError(res, err); }
//     if(!auburn) { return res.status(404).send('Not Found'); }
//     return res.json(auburn);
//   });
// };

// // Creates a new auburn in the DB.
// exports.create = function(req, res) {
//   Auburn.create(req.body, function(err, auburn) {
//     if(err) { return handleError(res, err); }
//     return res.status(201).json(auburn);
//   });
// };

// // Updates an existing auburn in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Auburn.findById(req.params.id, function (err, auburn) {
//     if (err) { return handleError(res, err); }
//     if(!auburn) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(auburn, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(auburn);
//     });
//   });
// };

// // Deletes a auburn from the DB.
// exports.destroy = function(req, res) {
//   Auburn.findById(req.params.id, function (err, auburn) {
//     if(err) { return handleError(res, err); }
//     if(!auburn) { return res.status(404).send('Not Found'); }
//     auburn.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.status(204).send('No Content');
//     });
//   });
// };

// function handleError(res, err) {
//   return res.status(500).send(err);
// }