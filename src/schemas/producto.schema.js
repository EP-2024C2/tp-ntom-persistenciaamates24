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
    descripcion: Joi.string().required().min(10).max(255).messages({
        "any.required": "La descripcion es requerido.",
        "string.min": "La descripcion debe contener al menos 3 caracteres.",
        "string.max": "La descripcion no puede ser superior a 255"
    }),
    precio: Joi.string().required().min(3).max(25).messages({ 
        "any.required": "El precio es requerido.",
        "number.min": "El precio debe contener al menos 1.",
        "number.max": "El precio debe contener como maximo 25."
    }),
    pathImg: Joi.string().min(5).max(255).messages({
        "any.required": "El campo img es requerido.",
        "string.min": "El campo img debe contener al menos 5 caracteres.",
        "string.max": "El campo img debe contener como maximo 255 caracteres."
    }),
})

const update = creation.fork(['nombre', 'descripcion', 'precio'], (field) => field.optional())

const productoSchema ={
    id,
    creation,
    update
}

module.exports = productoSchema