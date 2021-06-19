const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { deleteById, deleteByEmail } = require('../controllers/delete_methods.controller');

const { findById, findByEmail, findByName } = require('../controllers/get_methods.controller');
const { patchById, patchByEmail } = require('../controllers/patch_methods.controller');
const { putById, putByEmail } = require('../controllers/put_methods.controller');
const { findById:headFindId, findByEmail:headFindEmail } = require('../controllers/head_methods.controller');

/**
 * Distribuye la consulta según la validación.
 * Esta función sirve para no realizar consultas complejas.
 * Determina si el parámetro es un id de Mongo o un email y delega la
 * consulta al controlador adecuado.
 * Si no coincide con ninguna de las dos validaciones, se asume se
 * está buscando por nombre.
 * 
 * Revisar la documentación. Existen alternativas a esta ruta.
 */
const getQueryDist = (req = request, res = response, next) => {
    const check = validationResult(req).array();
    if (check.length > 0) {
        switch (check[0].msg) {
            case 'isemail':
                findByEmail(req, res);
                break;
                case 'ismongo':
                findById(req, res);
                break;
            }
    } else {
        findByName(req, res);
    }
    return;
}

/**
 * Middleware de distribución para las peticiones PUT.
 * Determina el tipo de parámetro pasado en la URL y delega
 * al controlador adecuado.
 */
const putQueryDist = (req = request, res = response, next) => {
    const check = validationResult(req).array();
    if (check.length > 0) {
        switch (check[0].msg) {
            case 'ismongo':
                putById(req, res);
                break;
            case 'isemail':
                putByEmail(req, res);
                break;
        }
    } else {
        res.status(400).json({'error': `El parámetro ${req.params.field} no es válido.`})
    }
    return;
}

/**
 * Middleware de distribución para las peticiones PATCH.
 * Determina el tipo de parámetro pasado en la URL y delega
 * al controlador adecuado.
 */
const patchQueryDist = (req = request, res = response, next) => {
    const check = validationResult(req).array();
    for (const i of check) {
        if (i.location == 'params') {
            switch (i.msg) {
                case 'ismongo':
                    patchById(req, res);
                    break;
                case 'isemail':
                    patchByEmail(req, res);
                    break;
            }
            return;
        } else {
            continue;
        }
    }
    res.status(400).json({'error': `El parámetro ${req.params.field} no es válido.`})
    return;
}

const deleteQueryDist = (req = request, res = response, next) => {
    const val = validationResult(req).array();
    if (val.length > 0) {
        switch (val[0].msg) {
            case 'ismongo':
                deleteById(req, res);
                break;
            case 'isemail':
                deleteByEmail(req, res);
                break;
        }
    } else res.status(400).json(`El parámetro ${req.params.field} no es válido. Revíselo y vuelva a intentarlo.`);
    return;
}

const headQueryDist = (req = request, res = response, next) => {
    console.log("Here");
    const check = validationResult(req).array();
    if (check.length > 0) {
        console.log(check);
        switch (check[0].msg) {
            case 'ismongo':
                headFindId(req, res);
                break;
            case 'isemail':
                headFindEmail(req, res);
                break;
        }
    } else res.sendStatus(400);
    return;
}

module.exports = { getQueryDist, putQueryDist, patchQueryDist, deleteQueryDist, headQueryDist }