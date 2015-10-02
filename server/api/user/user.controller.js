'use strict';

var Users = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var _ = require('lodash');
var auth = require('../../auth/auth.service');
var uuid = require('node-uuid');


var validationError = function(res, err) {
  return res.json(422, err);
};

exports.index = function(req, res) {
  new Users.User({}).fetchAll()
  .then(function(users){
    return res.json(200, users);
  })
  .catch(function(err){
    return res.send(500,err);
  })
}

/**
 * Creates a new user
 */

exports.create = function (req, res, next) {
  var newUser = new Users.User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    role: 'user',
    provider: 'local'
  })

  newUser.hashPassword(req.body.password)
    .then(function(result){
      newUser.set('hashedPassword', result);
      return newUser.save();
    })
    .then(function(user){
      user = user.toJSON();
      var token = auth.signToken(user._id, user.role);
      return res.json({token: token});
    })
    .catch(function(err){
      console.log(err);
      if (err && err.constraint) {
        console.log('err and err constraint');
        console.log(123, err.constraint);
        var err2 = {};
        switch (err.constraint) {
          case 'users_email_unique':
            err2.message = "That email address has already signed up";
            err2.field = "email";
            break;
          default:
            err2.message = "An error occurred. Please refresh and try again";
          }
        }
      return validationError(res, err2);
    });
};

exports.checkUsername = function(req,res) {
};

/**
 * Get a single user
 */
// exports.show = function (req, res, next) {
//   if (req.params.id === undefined) {
//     return res.send(404);
//   }

//   new Users.User({_id: req.params.id}).fetch({withRelated: ['friendships', 'issuedChallenges', 'newChallenges', 'activeChallengesTo', 'activeChallengesFrom']})
//     .then(function(user){
//       if (!user) {
//         return res.send(401);
//       }
//       var data = user.getPublicInfo();
//       data.friendships = _.map(data.friendships, function(u){
//         return {_id: u._id, username: u.username, lolServerUsername: u.lolServerUsername};
//       });
//       return res.json(data);
//     })
//     .catch(function(err){
//       return next(err);
//     });
// };


/**
 * Deletes a user
 * restriction: 'admin'
 */
// exports.destroy = function(req, res) {
//   User.findByIdAndRemove(req.params.id, function(err, user) {
//     if(err) return res.send(500, err);
//     return res.send(204);
//   });
// };

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  
  var user;
  var updateUser = new Users.User({_id: userId})
  updateUser.fetch()
  .then(function(fetchedUser){
    user = fetchedUser;
    if (user.authenticate(oldPass)) {
      return updateUser.hashPassword(newPass);
    }
  })
  .then(function(hashedPassword){
    user.set('hashedPassword', hashedPassword);
    user.save()
      .then(function(user){
        return res.send(200);
      })
      .catch(function(err){
        return validationError(res, err);
      })
  })
  .catch(function(err){
    return validationError(res,err);
  })
};


/**
 * Get my info
 */
exports.me = function(req, res, next) {
  new Users.User({_id: req.user._id}).fetch()
    .then(function(user){
      if (!user) {
        return res.send(401);
      }
      var data = user.toJSON();
      return res.json(data);
    })
    .catch(function(err){
      return next(err);
    });

};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

