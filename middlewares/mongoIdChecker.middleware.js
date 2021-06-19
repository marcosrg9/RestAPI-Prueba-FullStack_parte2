const { request, response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Middleware para comprobar si un id es de MongoDB.
 * Protege de una excepción extraña en las consultas findById.
 * Automáticamente responde si el identificador es inválido.
 */
const mongoIdCheckr = (req = request, res = response, next) => {
    const validation = validationResult(req);
    if (validation.isEmpty()) return next();
    const id = validation.array()[0].value;
    return res.status(400).json(`El id ${id} no es válido.`)
}

module.exports = { mongoIdCheckr };