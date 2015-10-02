'use strict';
var crypto = require('crypto');
var Bookshelf = require('../../postgresInit');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var _ = require('lodash');
var bcryptGenSalt  = Promise.promisify(bcrypt.genSalt);
var bcryptHash     = Promise.promisify(bcrypt.hash);


var User = Bookshelf.Model.extend({

    tableName: 'users',
    idAttribute: '_id',
    hasTimestamps: true,
    // initialize: function(){
    //   this.on('creating', this.hashPassword);
    // },

    authenticate: function(attemptedPassword){
      return bcrypt.compareSync(attemptedPassword, this.get('hashedPassword'));
    },

    hashPassword: function(password){
      return bcryptGenSalt().then(function(salt){
        return bcryptHash(password,salt);
      })
    },

    toJSON: function(){
      var attrs = Bookshelf.Model.prototype.toJSON.call(this);
      delete attrs.hashedPassword;
      return attrs;
    }
    
    //THIS IS WHERE ALL THE METHODS ON THE PROTOTYPE (ROW) GO
  }
    , {
    //THIS IS WHERE ALL THE METHODS FOR THE CLASS (TABLE) GO 

});

var Users = Bookshelf.Collection.extend({
    model: User
});

// exports.Payment = Bookshelf.model('Payment', Payment);
exports.User = Bookshelf.model('User', User);
exports.Users = Bookshelf.collection('Users', Users);
