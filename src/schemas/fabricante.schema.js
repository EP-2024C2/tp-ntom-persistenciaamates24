const Joi = require('joi')

const id = Joi.number().required().integer().positive().messages
    ({
        "any.required": "El ID es requerido.",
        'number.integer': 'El ID debe ser un número entero.', 
        'number.positive': 'El ID debe ser un número positivo.'
    })

const creation = Joi.object({
    nombre: Joi.string().required().min(3).max(255).messages({
        "any.required": "El nombre es requerido.",
        "string.min": "El nombre debe contener al menos 3 caracteres.",
        "string.max": "El nombre debe contener como maximo 255 caracteres."
           
    }),
    direccion: Joi.string().required().min(10).max(255).messages({
        "any.required": "La descripciones requerido.",
        "string.min": "La descripciondebe contener al menos 10 caracteres.",
        "string.max": "La descripcion debe contener como maximo 255 caracteres."
    }),
    numeroContacto: Joi.string().required().min(8).max(10).messages({
        "any.required": "El numero de contacto es requerido.",
        "string.min": "El numero de contacto debe contener al menos 8 caracteres.",
        "string.max": "El numero de contacto debe contener como maximo 10 caracteres."
    }),
    pathImgPerfil: Joi.string().min(5).max(255).messages({
        "any.required": "El campo img es requerido.",
        "string.min": "El campo img debe contener al menos 5 caracteres.",
        "string.max": "El campo img debe contener como maximo 255 caracteres."
    }),
})

const update = creation.fork(['nombre', 'direccion', 'numeroContacto'], (field) => field.optional());

const fabricanteSchema = {
    id,
    creation,
    update
}

module.exports = fabricanteSchema