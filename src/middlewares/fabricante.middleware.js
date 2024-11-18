const fabricanteSchema = require('../schemas/fabricante.schema');

const fabricanteExists = async (req, res, next) => {
  const { error } = fabricanteSchema.id.validate(req.params.id)
  if (error) {
      return res.status(400).json({ error: error })
  }
  next();
};

module.exports = { fabricanteExists };