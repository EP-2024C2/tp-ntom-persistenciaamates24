const { Producto, Fabricante, Componente } = require('../../models');

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
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (producto) {
      await producto.destroy();
      res.status(200).json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFabricantesToProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { fabricanteIds } = req.body;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    const fabricantes = await Fabricante.findAll({ where: { id: fabricanteIds } });
    await producto.addFabricantes(fabricantes);
    res.status(201).json({ message: 'Fabricantes añadidos al producto' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
