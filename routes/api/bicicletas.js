const express = require('express');
const router = express.Router();
const bicicletaControllerApi = require('../../controllers/api/bicicletaControllerApi')

router.get('/', bicicletaControllerApi.bicicleta_list)
router.post('/create', bicicletaControllerApi.bicicleta_create)
router.post('/:id/delete', bicicletaControllerApi.bicicleta_delete)

module.exports = router