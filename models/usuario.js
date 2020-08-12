var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const Token = require('./token');
const mailer = require('../mailer/mailer');

const saltRounds = 10;

var Schema = mongoose.Schema;

const validateEmail = function (email) {
  const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return regExp.test(email);
}

var usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'El email es obligatorio'],
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Por favor ingrese un email valido'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/]
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false
  }
})

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario '});

usuarioSchema.pre('save', function(next){
  if ( this.isModified('password') ){
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
})

usuarioSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}


usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
  var reserva = new Reserva({
    usuario: this._id,
    bicicleta: biciId,
    desde,
    hasta
  })
  console.log(reserva)
  reserva.save(cb);
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
  const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')})
  const email_destination = this.email;
  token.save((err) => {
    if ( err ) { return console.log(err.message)}
    const mailOptions = {
      from: 'no-reply@redbicicletas.com',
      to: email_destination,
      subject: 'Verificacion de cuenta',
      text: 'Hola,\n\n' 
      + 'Por favor, para verificar su cuenta haga click en este link: \n' 
      + 'http://localhost:3000'
      + '\/token/confirmation\/' + token.token + '.\n'
    }

    mailer.sendMail(mailOptions, function(err){
      if( err ) { return console.log(err.message) } 
      console.log('Se ha enviado un email de bienvenida a: ' + email_destination)
    })
  })
}

module.exports = mongoose.model('Usuario', usuarioSchema)