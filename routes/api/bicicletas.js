const express = require('express');
const router = express.Router();
const bicicletaControllerApi = require('../../controllers/api/bicicletaControllerApi')

router.get('/', bicicletaControllerApi.bicicleta_list)

module.exports = router