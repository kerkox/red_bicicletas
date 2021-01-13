var mongoose = require('mongoose');
var axios = require('axios');
var Bicicleta = require("../../models/bicicleta");
var server = require('../../bin/www')
var URL = 'http://localhost:3000/api/bicicletas';
// var URL = '';
describe('Test Bicicleta', () => {

  beforeAll((done) => {
    // var mongoDB = 'mongodb://localhost/testdb';
    var mongoDB = 'mongodb+srv://strider:Qj7bTtEvyRqZW5mG@cluster0-vbnxk.mongodb.net/testdb';
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'))
    db.once('open', () => {
      console.log("conectado a la BD")
      done();
    })
  })

  afterEach((done) => {
    Bicicleta.deleteMany({}, (err, success) => {
      if (err) console.log(err);
      done();
    })
  })


  describe('GET BICICLETAS / ', () => {
    it('Status 200', async (done) => {
      axios.get(URL, function (error, response, body) {
        let data = JSON.parse(body)
        expect(response.status).toBe(200);
        expect(data.bicicletas.length).toBe(0);
        done();
      })
    })
  })

  describe('POST BICICLETAS /create', () => {
    it('STATUS 200', (done) => {
      var headersR = {
        'Content-Type': 'application/json'
      };
      var aBici = {
        "code": 10,
        "color": "rojo",
        "modelo": "urbana",
        "lat": "-54.36",
        "lng": "-74.35"
      }
      axios.post(URL + '/create', aBici, {
        headers: headersR
      })
        .then(response => {
          expect(response.status).toBe(200);
          let bici = response.data.bicicleta
          expect(bici.code).toBe(aBici.code)
          expect(bici.color).toBe(aBici.color)
          expect(bici.modelo).toBe(aBici.modelo)
          expect(bici.ubicacion[0]).toBe(Number(aBici.lat))
          expect(bici.ubicacion[1]).toBe(Number(aBici.lng))

          done();
        })
    })
  })

  describe('PUT BICICLETAS /update', () => {
    it('STATUS 200', (done) => {
      var headersR = {
        'content-type': 'application/json'
      };
      var bici = new Bicicleta({
        code: 10,
        color: "azul",
        modelo: "urbana",
        ubicacion: [-54.36, -74.35]
      });
      bici.save();
      const id = bici.id;
      let update = {
        color: "azul",
        modelo: "Deportiva"
      }
      axios.put(`${URL}/${id}/update`, update, {
        headers: headersR
      })
        .then(response => {
          expect(response.status).toBe(200);
          // console.log("response.data-----------------",response.data)
          // const id = response.data.bicicleta._id
          Bicicleta.findById(id).exec((err, biciBD) => {
            expect(biciBD.modelo).toBe(update.modelo)
            expect(biciBD.color).toBe(update.color)
            done();
          })
        })
    })
  })

  describe('DELETE BICICLETAS /delete', () => {
    it('STATUS 204', (done) => {
      var headersR = {
        'content-type': 'application/json'
      };
      var aBici = {
        "code": 10,
        "color": "rojo",
        "modelo": "urbana"
      }
      Bicicleta.add(aBici, (err, data) => {
        axios.delete(`http://localhost:3000/api/bicicletas/${data._id}/delete`, {
          headers: headersR
        })
          .then(response => {
            expect(response.status).toBe(204);
            Bicicleta.findById(data._id).exec((err, biciBD) => {
              expect(biciBD).toBeNull();
              done();
            })
              
          })
      });
    })
  })

})