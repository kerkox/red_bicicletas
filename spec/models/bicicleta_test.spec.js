var Bicicleta = require("../../models/bicicleta");

beforeEach(() => { Bicicleta.allBicis = []; });

describe("Bicicletas.allBicis", () => {
  it('comienza vacia', () => {
    expect(Bicicleta.allBicis.length).toBe(0)
  })
})

describe("Bicicletas.add", () => {
  it('Agregamos una', () => {
    expect(Bicicleta.allBicis.length).toBe(0)
    var a = new Bicicleta(1, 'rojo', 'urbana', [6.2321014, -75.5854385]);
    Bicicleta.add(a);
    expect(Bicicleta.allBicis.length).toBe(1)
    expect(Bicicleta.allBicis[0]).toBe(a);
  })
})

describe("Bicicletas.findById", () => {
  it('debe devolver la bici con el id 1', () => {
    expect(Bicicleta.allBicis.length).toBe(0)
    var aBici = new Bicicleta(1, 'rojo', 'urbana');
    var aBici2 = new Bicicleta(2, 'verde', 'Deportiva');
    Bicicleta.add(aBici);
    Bicicleta.add(aBici2);
    var targetBici = Bicicleta.findById(1);
    expect(targetBici.id).toBe(1)
    expect(targetBici.color).toBe(aBici.color);
    expect(targetBici.modelo).toBe(aBici.modelo);
  })
})

describe("Bicicletas.removeById", () => {
  it('debe de borrar la bici con id 1', () => {
    expect(Bicicleta.allBicis.length).toBe(0)
    var aBici = new Bicicleta(1, 'rojo', 'urbana');
    var aBici2 = new Bicicleta(2, 'verde', 'Deportiva');
    Bicicleta.add(aBici);
    Bicicleta.add(aBici2);
    expect(Bicicleta.allBicis.length).toBe(2)
    Bicicleta.removeById(aBici.id);
    expect(() => {Bicicleta.findById(aBici.id) })
    .toThrow(new Error(`No existe una bicicleta con el id ${aBici.id}`))
  })
})