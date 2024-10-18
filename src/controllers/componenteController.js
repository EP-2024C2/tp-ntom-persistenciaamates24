const { Componente, Producto } = require('../../models');

exports.getAllComponentes = async (req, res) => {
  try {
    const componentes = await Componente.findAll({
      include: [Producto]
    });
    res.status(200).json(componentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComponenteById = async (req, res) => {
  try {
    const componente = await Componente.findByPk(req.params.id, { include: [Producto] });
    if (componente) {
      res.status(200).json(componente);
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComponente = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoComponente = await Componente.create({ nombre, descripcion });
    res.status(201).json(nuevoComponente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComponente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const componente = await Componente.findByPk(id);
    if (componente) {
      await componente.update({ nombre, descripcion });
      res.status(200).json(componente);
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComponente = async (req, res) => {
  try {
    const { id } = req.params;
    const componente = await Componente.findByPk(id);
    if (componente) {
      await componente.destroy();
      res.status(200).json({ message: 'Componente eliminado' });
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductosByComponente = async (req, res) => {
  try {
    const componente = await Componente.findByPk(req.params.id, { include: [Producto] });
    if (!componente) return res.status(404).json({ message: 'Componente no encontrado' });
    res.status(200).json(componente.Productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
