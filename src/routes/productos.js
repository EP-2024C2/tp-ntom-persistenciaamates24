const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const productosSchema = require ('../schemas/producto.schema')
const validadorSchemas = require('../middlewares/schemas.middleware')
const {productoExists} = require ('../middlewares/producto.middleware')

router.get('/', productoController.getAllProductos);
router.get('/:id', productoExists, productoController.getProductoById);
router.post('/',  validadorSchemas(productosSchema.creation), productoController.createProducto);
router.put('/:id', productoExists, validadorSchemas(productosSchema.update) ,productoController.updateProducto);
router.delete('/:id', productoExists, productoController.deleteProducto);
router.post('/:id/fabricantes', productoExists, productoController.addFabricantesToProducto);
router.get('/:id/fabricantes', productoExists, productoController.getFabricantesByProducto);
router.post('/:id/componentes', productoExists, productoController.addComponentesToProducto);
router.get('/:id/componentes', productoExists, productoController.getComponentesByProducto);

module.exports = router;