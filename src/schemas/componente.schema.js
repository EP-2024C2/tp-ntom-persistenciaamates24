const Joi = require('joi')

const id = Joi.number().required().integer().positive().messages
    ({
        "any.required": "El ID es requerido.",
        'number.integer': 'El ID debe ser un número entero.', 
        'number.positive': 'El ID debe ser un número positivo.'
    })

const creation = Joi.object({
    nombre: Joi.string().required().min(3).max(255).messages
        ({
            "any.required": "El nombre es requerido.",
            "string.min": "El nombre debe contener al menos 3 caracteres.",
            "string.max": "El nombre debe contener como maximo 255 caracteres."
        }),
    descripcion: Joi.string().required().min(10).max(255).messages
        ({
            "any.required": "La descripcion es requerido.",
            "string.min": "La descripcion debe contener al menos 10 caracteres.",
            "string.max": "La descripcion no puede ser superior a 255"
        })
    })

const update = creation.fork(['nombre', 'descripcion'], (field) => field.optional())


const componenteSchema = {
    id,
    creation,
    update
}

module.exports = componenteSchema