const express = require('express');
const router = express.Router();
const fabricanteController = require('../controllers/fabricanteController');
const fabricanteSchema = require('../schemas/fabricante.schema');

const validadorSchemas = require('../middlewares/schemas.middleware')
const {fabricanteExists} = require ('../middlewares/fabricante.middleware');


router.get('/', fabricanteController.getAllFabricantes);
router.get('/:id',fabricanteExists, fabricanteController.getFabricanteById);
router.post('/', validadorSchemas(fabricanteSchema.creation),fabricanteController.createFabricante);
router.put('/:id',fabricanteExists,validadorSchemas(fabricanteSchema.update), fabricanteController.updateFabricante);
router.delete('/:id',fabricanteExists, fabricanteController.deleteFabricante);
router.get('/:id/productos',fabricanteExists, fabricanteController.getProductosByFabricante);

module.exports = router;
