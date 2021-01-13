require('dotenv').config();
var mongoose = require('mongoose')
var Bicicleta = require('../../models/bicicleta')
var Reserva = require('../../models/reserva');
var Usuario = require('../../models/usuario');
// var {Usuario, Reserva} = require('../../models/usuario')


describe('Testing Usuarios', function () {
  let db;
  conectar = (done) => {
    var mongoDB = process.env.MONGO_URI;
    console.log("mongoDB: ", mongoDB)
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('We are connected to test database!');
      done();
    })
  }
  beforeAll(function (done) {
    // var mongoDB = 'mongodb://localhost/testdb'
    if (mongoose.connection.readyState) {
      db = mongoose.connection;
      done();
    } else {
      conectar(done);
    }
  })

  afterEach(function (done) {
    Reserva.deleteMany({}, function (err, success) {
      if (err) console.log(err)
      Usuario.deleteMany({}, function (err, success) {
        if (err) console.log(err);
        Bicicleta.deleteMany({}, (err, success) => {
          if (err) console.log(err);
          done()
        })
      })
    })
  })

  describe('Cuando un Usuario reserva una bici', () => {
    it('debe existir la reserva', (done) => {
      const usuario = new Usuario({
        nombre: 'Prueba',
        email: 'test@test.com',
        password: '123456'
      })
      usuario.save()
      const bicicleta = new Bicicleta({
        code: 1,
        color: "verde",
        modelo: "deportiva"
      })
      bicicleta.save();

      var hoy = new Date();
      var mañana = new Date();
      mañana.setDate(hoy.getDate() + 1)
      usuario.reservar(bicicleta.id, hoy, mañana, (err, reserva) => {
        Reserva.find({}).populate('bicicleta').populate('usuario').exec((err, reservas) => {
          // console.log(reservas[0]);
          expect(reservas.length).toBe(1)
          expect(reservas[0].diasDeReserva()).toBe(2)
          expect(reservas[0].bicicleta.code).toBe(1)
          expect(reservas[0].usuario.nombre).toBe(usuario.nombre)
          done()

        })
      })
    })
  })


})