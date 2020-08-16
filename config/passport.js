const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  fbGraphVersion: 'v3.0'
}, function (accessToken, refreshToken, profile, done) {
  console.log("FaceToken--profile", profile);
  Usuario.findOneOrCreateByFacebook(profile, function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
}));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    console.log("****************************************")
    console.log("EMAIL: ", email)
    Usuario.findOne({
      email: email
    }, function (err, usuarioDB) {
      if (err) return done(err);
      if (!usuarioDB) return done(null, false, {
        message: 'Email no existente o incorrecto'
      });
      if (!usuarioDB.validPassword(password)) return done(null, false, {
        message: 'Password Incorrecto'
      })

      return done(null, usuarioDB)
    })
  }
));

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback"
  }, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    Usuario.findOneOrCreateByGoogle(profile, (err, user) => {
      return cb(err, user);
    });
  }));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST + "/auth/facebook/callback",
    profileFields: ["emails","name","displayName",]
  },
  function (accessToken, refreshToken, profile, done) {
    console.log("Face--profile", profile);
    Usuario.findOneOrCreateByFacebook(profile, function (err, user) {
      console.log("profile", profile)
      console.log("user", user)
      if (err) {
        return done(err);
      }
      done(null, user);
    });
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