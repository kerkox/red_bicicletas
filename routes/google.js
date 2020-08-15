const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.get(
  "/",
  passport.authenticate("google", {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read',
      'profile',
      'email'
    ],
  })
);

router.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/bicicletas');
  });

module.exports = router;