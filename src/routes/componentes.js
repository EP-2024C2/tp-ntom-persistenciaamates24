/*const express = require('express');
const router = express.Router();*/

const {Router} = require('express')
const routes = Router()


const componenteController = require('../controllers/componenteController');
const componenteSchemas = require('../schemas/componente.schema')

const validadorSchemas = require('../middlewares/schemas.middleware')
const {componenteExist} = require ('../middlewares/componente.middleware')

routes.get('/', componenteController.getAllComponentes);
routes.get('/:id',componenteExist , componenteController.getComponenteById);
routes.post('/', validadorSchemas(componenteSchemas.creation),componenteController.createComponente);
routes.put('/:id',componenteExist,validadorSchemas(componenteSchemas.update),componenteController.updateComponente);
routes.delete('/:id',componenteExist , componenteController.deleteComponente);
routes.get('/:id/productos',componenteExist , componenteController.getProductosByComponente);

module.exports = routes;
