const _ = require('underscore')
const Bicicleta = require('../../models/bicicleta')

exports.bicicleta_list = function (req, res) {
  Bicicleta.allBicis().exec((err, bicis) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      bicicletas: bicis
    })
  })

}

exports.bicicleta_create = function (req, res) {
  let bici = new Bicicleta({
    code: req.body.code,
    color: req.body.color,
    modelo: req.body.modelo,
    ubicacion: [req.body.lat, req.body.lng]
  });
  // bici.save();
  Bicicleta.add(bici)

  res.status(200).json({
    bicicleta: bici
  })
}

exports.bicicleta_delete = function (req, res) {
  const id = req.params.id;
  Bicicleta.findByIdAndRemove(id, (err, data) => {
    if(err) {
      res.status(404).json({ok:false, message:`Error no se encuentra la bicicleta con el ID: ${id}`})
      return;
    }
    res.status(204).json({ok:true});

  })
}

exports.bicicleta_update_post = function (req, res) {
  let body = _.pick(req.body, ['color', 'modelo', 'code'])
  const id = req.params.id;
  Bicicleta.findOneAndUpdate(
    id,
    body, {
      new: true
    },
    (err, biciBD) => {
      if (err) {
        return res.status(404).json({
          ok: false,
          error: {
            message: `No se encuentra una bicicleta con id: ${req.params.id}`,
            err
          }
        })
      }
      // console.log(`params.id ${id} biciDb.id: ${biciBD.id}********************`);
      return res.status(200).json({
        bicicleta: biciBD
      })
    })
  // console.log("bici", bici)


}
// bici.id = req.body.id
// bici.color = req.body.color
// bici.modelo = req.body.modelo
// bici.ubicacion = [req.body.lat, req.body.lng];
// Bicicleta.removeById(bici.id);
// Bicicleta.add(bici);