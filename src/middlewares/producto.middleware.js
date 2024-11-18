const { Producto } = require('../models/producto.js');

const productoExists = async (req, res, next) => {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({
        msg: `No existe un producto con el id ${id}`,
      });
    }
    next();
  
};

module.exports = { productoExists };