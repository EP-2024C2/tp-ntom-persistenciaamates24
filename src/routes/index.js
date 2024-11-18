const { Router } = require('express')
const componentesRoute = require('./componentes')
const fabricantesRoute = require('./fabricantes')
const productosRoute = require('./productos')

const router = Router();

router.use('/componentes', componentesRoute);
router.use('/fabricantes', fabricantesRoute);
router.use('/productos', productosRoute);

module.exports = router;