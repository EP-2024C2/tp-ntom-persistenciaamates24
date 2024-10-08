const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);
router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);
router.post('/:id/fabricantes', productoController.addFabricantesToProducto);
router.get('/:id/fabricantes', productoController.getFabricantesByProducto);
router.post('/:id/componentes', productoController.addComponentesToProducto);
router.get('/:id/componentes', productoController.getComponentesByProducto);

module.exports = router;