const componenteSchema = require('../schemas/componente.schema');

const componenteExist = async (req, res, next) => {
  {
    const {error} = componenteSchema.id.validate(req.params.id)
    if (error) 
        {
        return res.status(400).json({error: error})
        }
    next()
    } 
  
};

module.exports = { componenteExist };

