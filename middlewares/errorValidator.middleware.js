const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { validation } = require('../helpers/middlewareValidation.helper')

/**
 * Middleware de respuesta a campos del cuerpo vacíos.
 */
const emptyBodyFields = (req = request, res = response, next) => {
    const val = validation(req, 'empty');
    console.log(val);
    if (!val) return next();
    else return res.status(400).json(val);
}

/**
 * Middleware de respuesta a campos del cuerpo incorrectos.
 */
const invalidFields = (req = request, res = response, next) => {
    const val = validation(req, 'invalid');
    if (!val) return next();
    else return res.status(400).json(val);
}

/**
 * Middleware de respuesta a cuerpos con al menos un campo.
 */
const atLeastOneField = (req = request, res = response, next) => {
    const val = validation(req, 'empty');
    if (val) return next();
    else return res.status(400).json('Debe introducir al menos un parámetro válido para actualizar el documento.');
}

module.exports = { emptyBodyFields, invalidFields, atLeastOneField };