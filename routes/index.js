const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const Usuario = require('../models/usuario')
const path = require('path')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function (req, res) {
  res.render('session/login')
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, usuario, info) {
    if (err) return next(err);
    if (!usuario) return res.render('session/login', {
      info
    })

    req.logIn(usuario, function (err) {
      if (err) return next(err)
      return res.redirect('/bicicletas');
    });
  })(req, res, next)
})

router.get('/logout', function (req, res) {
  req.logOut();
  res.redirect('/')
})

router.get('/forgotPassword', function (req, res) {
  res.render('session/forgotPassword');
})
router.post('/forgotPassword', function (req, res) {
  usuario.findOne({
    email: req.body.email
  }, function (err, usuario) {
    if (!usuario) return res.render('session/forgotPassword', {
      info: {
        message: 'No existe el usuario con ese correo'
      }
    })

    usuario.resetPassword(function (err) {
      if (err) return next(err);
      console.log('session/forgtoPasswordMessage');
    });
    res.render('session/forgotPasswordMessage');
  })
})

router.get('/resetPassword/:token', function (req, res, next) {
  Token.findOne({
    token: req.params.token
  }, function (err, token) {
    if (!token) return res.status(400).send({
      type: 'not-verified',
      msg: 'No existe un usuario asociado al token. verifique que su token no haya expriado'
    })

    Usuario.findById(token._userId, function (err, usuario) {
      if (!usuario) return res.status(400).send({
        msg: 'No existe un usuario asociado al token'
      })
      res.render('session/resetPassword', {
        errors: {},
        usuario
      })
    })
  })
})

router.post('/resetPassword', function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    res.render('session/resetPassword', {
      errors: {
        confirm_password: {
          message: 'No concide con el password ingresado'
        }
      },
      usuario: new Usuario({
        email: req.body.email
      })
    })
    return;
  }
  Usuario.findOne({
    email: req.body.email
  }, function (err, usuario) {
    usuario.password = req.body.password;
    usuario.save(function (err) {
      if (err) {
        res.render('session/resetPassword', {
          errors: err.errors,
          usuario: new Usuario({
            email: req.body.email
          })
        })
      } else {
        res.redirect('/login');
      }
    })
  })
})


module.exports = router;
