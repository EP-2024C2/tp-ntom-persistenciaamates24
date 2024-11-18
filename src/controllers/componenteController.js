const { Producto, Componente } = require('../models/index');

const componenteController = {}

const getAllComponentes = async (req, res) => {
  try {
    const componentes = await Componente.findAll()
    res.status(200).json(componentes)
    } 
  catch (error) {
    res.status(500).json({message: 'Hubo un error al obtener los componentes.', messageError: error})
    }
};
componenteController.getAllComponentes = getAllComponentes

const getComponenteById = async (req, res) => {
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
componenteController.getComponenteById = getComponenteById

const createComponente = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoComponente = await Componente.create({ nombre, descripcion });
    res.status(201).json(nuevoComponente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
componenteController.createComponente = createComponente

const updateComponente = async (req, res) => {
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
componenteController.updateComponente = updateComponente

const deleteComponente = async (req, res) => {
  
    const { id } = req.params;
    try {
      const componente = await Componente.findByPk(id)
      if (!componente) {
          return res.status(404).json({ error: `El ID ${id} no corresponde a ningún componente.`})
      }
      const producto = await Componente.findByPk(id, { include: 'Productos' });
      if (producto && producto.Productos && producto.Productos.length > 0) {
          return res.status(400).json({ error: 'No se puede eliminar el componente porque tiene productos asociados.' });
      }
      await componente.destroy()
      res.status(200).json({ message: `Componente de ID ${id}, eliminado con éxito.`})
  }
  catch (error) {
    res.status(500).json({ error: 'Error al eliminar el componente.'})
  }
}

componenteController.deleteComponente = deleteComponente

const getProductosByComponente = async (req, res) => {
  try {
    const componente = await Componente.findByPk(req.params.id, { include: [Producto] });
    if (!componente) return res.status(404).json({ message: 'Componente no encontrado' });
    res.status(200).json(componente.Productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
componenteController.getProductosByComponente = getProductosByComponente

module.exports = componenteController