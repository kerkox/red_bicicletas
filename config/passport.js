const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario')

passport.use(new LocalStrategy(
  function(email, password, done) {
    Usuario.findOne({email: email}, function(err, usuarioDB) {
      if(err) return done(err);
      if( !usuarioDB) return done(null, false, {message: 'Email no existente o incorrecto'});
      if(!usuarioDB.validaPassword(password)) return done(null, false, {message: 'Password Incorrecto'})

      return done(null, usuarioDB)
    })
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  Usuario.findById(id, function (err, usuario) {
    cb(err, usuario);
  });
});

module.exports = passport;