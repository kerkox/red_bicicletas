var axios = require('axios');
var Bicicleta = require("../../models/bicicleta");
var server = require('../../bin/www')

beforeEach(() => Bicicleta.allBicis = [])

describe('Bicicleta API', () => {
  describe('GET BICICLETAS / ', () => {
    it('Status 200', async () => {
      expect(Bicicleta.allBicis.length).toBe(0);
      var a = new Bicicleta(1,'negra', 'Deportiva');
      Bicicleta.add(a);
      let response = await axios.get('http://localhost:3000/api/bicicletas')
      expect(response.status).toBe(200);
   
    })
  })

  describe('POST BICICLETAS /create', () => {
    it('STATUS 200', (done) => {
      var headersR = {'content-type': 'application/json'};
      var aBici = { "id": 10, "color":"rojo","modelo":"urbana"}
      axios.post('http://localhost:3000/api/bicicletas/create',aBici,{headers:headersR})
      .then(response => {
        expect(response.status).toBe(200);
        expect(Bicicleta.findById(aBici.id).color).toBe(aBici.color)
        done();
      })      
    })
  })

  describe('PUT BICICLETAS /update', () => {
    it('STATUS 200', (done) => {
      var headersR = {'content-type': 'application/json'};
      var aBici = { "id": 10, "color":"rojo","modelo":"urbana"}
      Bicicleta.add(aBici);
      aBici.color = "azul"
      aBici.modelo = "Deportiva";
      axios.post(`http://localhost:3000/api/bicicletas/${aBici.id}/update`,aBici,{headers:headersR})
      .then(response => {
        expect(response.status).toBe(200);
        expect(Bicicleta.findById(aBici.id).color).toBe(aBici.color)
        expect(Bicicleta.findById(aBici.id).modelo).toBe(aBici.modelo)
        done();
      })      
    })
  })

  describe('DELETE BICICLETAS /delete', () => {
    it('STATUS 204', (done) => {
      var headersR = {'content-type': 'application/json'};
      var aBici = { "id": 10, "color":"rojo","modelo":"urbana"}
      Bicicleta.add(aBici);
      axios.delete(`http://localhost:3000/api/bicicletas/${aBici.id}/delete`,{headers:headersR})
      .then(response => {
        expect(response.status).toBe(204);
        expect(() => {Bicicleta.findById(aBici.id) })
        .toThrow(new Error(`No existe una bicicleta con el id ${aBici.id}`))
        done();
      })      
    })
  })

})