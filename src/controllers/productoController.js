const { Producto, Fabricante, Componente } = require('../models');

exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [Fabricante, Componente]
    });
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, { include: [Fabricante, Componente] });
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, pathImg } = req.body;
    const nuevoProducto = await Producto.create({ nombre, descripcion, precio, pathImg });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, pathImg } = req.body;
    const producto = await Producto.findByPk(id);
    if (producto) {
      await producto.update({ nombre, descripcion, precio, pathImg });
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  const {id} = req.params;
  try {
      const producto = await Producto.findByPk(id);
      if(!producto){
        res.status(404).json({message: 'El producto no existe'});
      }
      const fabricante = await Producto.findByPk(id, { include: 'Fabricantes' });
      if (fabricante && fabricante.Fabricantes && fabricante.Fabricantes.length > 0) {
          return res.status(400).json({ error: 'No se puede eliminar el producto porque tiene fabricantes asociados.' });
      }
      const componente = await Producto.findByPk(id, { include: 'Componentes' });
      if (componente && componente.Componentes && componente.Componentes.length > 0) {
          return res.status(400).json({ error: 'No se puede eliminar el producto porque tiene componentes asociados.' });
      }
      await producto.destroy()
      return res.status(200).json({message: `El producto fue con id: ${id} fue eliminado correctamente`})
    } catch (error) {
        return res.status(500).json({message: 'Hubo un error al eliminar el producto', messageError: error});
      }
};

exports.addFabricantesToProducto = async (req, res) => {
  const { id } = req.params;
  const { fabricanteIds } = req.body;
  try {
      const fabricantes = await Fabricante.findAll({where: {id: fabricanteIds}});
      if (!fabricantes) {
          return res.status(404).json({ error: `El ID ${fabricanteId} no corresponde a ningún fabricante.`});
      }
      const producto = await Producto.findByPk(id);
      if (!producto) {
          return res.status(404).json({ error: `El ID ${id} no corresponde a ningún producto.`});
      }
      await producto.addFabricantes(fabricantes);
      return res.status(201).json({message: 'El fabricante fue asociado correctamente.', producto});
  } catch (error) {
      console.log(error);
      return res.status(400).json({message:'Hubo un error al asociar el fabribante con el producto.'});
  }
};

exports.getFabricantesByProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, { include: [Fabricante] });
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(producto.Fabricantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComponentesToProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { componenteIds } = req.body;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    const componentes = await Componente.findAll({ where: { id: componenteIds } });
    await producto.addComponentes(componentes);
    res.status(201).json({ message: 'Componentes añadidos al producto' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComponentesByProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, { include: [Componente] });
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(producto.Componentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
