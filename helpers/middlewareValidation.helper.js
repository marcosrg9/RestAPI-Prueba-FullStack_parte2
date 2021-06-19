const { validationResult } = require('express-validator');

/**
 * Helper para generar respuestas del middleware de validación.
 * @param {require} req Request de una petición de express.
 * @param {string} control Cambia la respuesta según el valor dado (empty/invalid).
 */
const validation = (req, control) => {
    if (validationResult(req).isEmpty()) return;
    const errors = {};
    validationResult(req)
        .array()
        .map(err => {
            if (control == 'empty') errors[err.param] = `El parámetro ${err.param} no puede estar vacío.`
            else if (control == 'invalid') errors[err.param] = `El parámetro ${err.param} no es válido.`
        });
        return errors;
}

module.exports = { validation }