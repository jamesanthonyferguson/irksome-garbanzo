/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/meters              ->  index
 */

'use strict';
var request = require('request');
// Gets a list of Meters
exports.index = function(req, res) {
   var id = req.params.id;
   request(
   	// 'http://io.ekmpush.com/readMeter/v4/key/MTExOjExMQ/count/10/format/json/meters/' + id,
   	'http://io.ekmpush.com/readMeter/v3/key/NjUyMjEwNTE6Sjl4MXRmTHc/format/json/meters/'+id+'/count/20/timezone/Australia~Sydney/',
   	function (err, response) {
   	res.json(response);
   });

};
