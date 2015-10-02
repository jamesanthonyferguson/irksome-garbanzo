var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      // User.findOne({
      //   email: email.toLowerCase()
      // }, function(err, user) {
      //   if (err) return done(err);

      //   if (!user) {
      //     return done(null, false, { message: 'This email is not registered.' });
      //   }
      //   if (!user.authenticate(password)) {
      //     return done(null, false, { message: 'This password is not correct.' });
      //   }
      //   return done(null, user);
      // });

        new User.User({email: email.toLowerCase()}).fetch()
          .then(function(user){
            if (!user){
              return done(null, false, {message: 'This email is not registered.'});
            }
            if (!user.authenticate(password)) {
              return done(null, false, {message: 'This password is not correct.'});
            }
            //TODO don't send hashed pw
            return done(null, user.toJSON());
          })
          .catch(function(err){
            console.log(err);
            return done(err);
          })
    }
  ));
};