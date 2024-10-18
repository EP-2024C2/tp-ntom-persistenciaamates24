const { Fabricante, Producto } = require('../../models');

exports.getAllFabricantes = async (req, res) => {
  try {
    const fabricantes = await Fabricante.findAll({ include: [Producto] });
    res.status(200).json(fabricantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFabricanteById = async (req, res) => {
  try {
    const fabricante = await Fabricante.findByPk(req.params.id, { include: [Producto] });
    if (fabricante) {
      res.status(200).json(fabricante);
    } else {
      res.status(404).json({ message: 'Fabricante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFabricante = async (req, res) => {
  try {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body;
    const nuevoFabricante = await Fabricante.create({ nombre, direccion, numeroContacto, pathImgPerfil });
    res.status(201).json(nuevoFabricante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFabricante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body;
    const fabricante = await Fabricante.findByPk(id);
    if (fabricante) {
      await fabricante.update({ nombre, direccion, numeroContacto, pathImgPerfil });
      res.status(200).json(fabricante);
    } else {
      res.status(404).json({ message: 'Fabricante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFabricante = async (req, res) => {
  try {
    const { id } = req.params;
    const fabricante = await Fabricante.findByPk(id);
    if (fabricante) {
      await fabricante.destroy();
      res.status(200).json({ message: 'Fabricante eliminado' });
    } else {
      res.status(404).json({ message: 'Fabricante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductosByFabricante = async (req, res) => {
  try {
    const fabricante = await Fabricante.findByPk(req.params.id, { include: [Producto] });
    if (!fabricante) return res.status(404).json({ message: 'Fabricante no encontrado' });
    res.status(200).json(fabricante.Productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
