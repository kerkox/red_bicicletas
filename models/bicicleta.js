var Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function () {
  return `id: ${this.id}  | color: ${this.color}`
}

Bicicleta.allBicis = [];
Bicicleta.add = function (aBici) {
  Bicicleta.allBicis.push(aBici)
}

Bicicleta.findById = function (addBiciId) {
  var addBiciId = Bicicleta.allBicis.find(x => x.id == addBiciId)
  if (addBiciId)
    return addBiciId
  else
    throw new Error(`No existe una bicicleta con el id ${addBiciId}`)
}

Bicicleta.removeById = function (addBiciId) {
  // var addBici = Bicicleta.findById(addBiciId)
  for (let i = 0; i < Bicicleta.allBicis.length; i++) {
    if (Bicicleta.allBicis[i].id == addBiciId) {
      Bicicleta.allBicis.splice(i, 1)
      break;
    }
  }
}

var a = new Bicicleta(1, 'rojo', 'urbana', [6.2321014, -75.5854385]);
var b = new Bicicleta(2, 'blanca', 'urbana', [6.238874, -75.574474]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;