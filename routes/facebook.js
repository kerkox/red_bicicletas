const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.get("/", passport.authenticate('facebook', {
  scope: ['read_stream', 'public_profile', 'email']
}));

router.get('/callback',
  passport.authenticate('facebook', {
    successRedirect: '/bicicletas',
    failureRedirect: '/login'
  })
);

module.exports = router;