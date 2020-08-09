var mongoose = require('mongoose');
const Reserva = require('./Reserva')
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  nombre: String
})

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
  var reserva = new Reserva({
    usuario: this._id,
    bicicleta: biciId,
    desde,
    hasta
  })
  console.log("reserva", reserva)
  reserva.save(cb);
}
let Usuario  = mongoose.model('Usuario', usuarioSchema)
module.exports = {
  Usuario,
  Reserva
}