const express = require('express');
const router = express.Router();
const fabricanteController = require('../controllers/fabricanteController');

router.get('/', fabricanteController.getAllFabricantes);
router.get('/:id', fabricanteController.getFabricanteById);
router.post('/', fabricanteController.createFabricante);
router.put('/:id', fabricanteController.updateFabricante);
router.delete('/:id', fabricanteController.deleteFabricante);
router.get('/:id/productos', fabricanteController.getProductosByFabricante);

module.exports = router;
