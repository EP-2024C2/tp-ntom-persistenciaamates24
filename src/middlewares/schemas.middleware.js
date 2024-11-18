const validadorSchemas = (schema) => {
    return (req,res,next) => {
        const resultado = schema.validate(req.body, {abortEarly:false})
        if (resultado.error){
            return res.status(400).json({
                mensaje: "Error de validacion",
                errores: resultado.error.details.map((e) =>{
                    return { atributo: e.path[0], mensaje: e.message}
                })
            });
        }
        next();
    }
}
module.exports = validadorSchemas;