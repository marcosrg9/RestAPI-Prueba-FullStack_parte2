const { param, body } = require('express-validator');
const { patchById, patchByEmail } = require('../../controllers/patch_methods.controller');
const { atLeastOneField } = require('../../middlewares/errorValidator.middleware');
const { mongoIdCheckr } = require('../../middlewares/mongoIdChecker.middleware');
const { patchQueryDist } = require('../../middlewares/query_distributor.middleware');

const PATCH = require('express').Router();

// Responde a peticiones sin parámetros.
PATCH.patch('/', (req, res) => res.status(400).json('Debe especificar un parámetro. Puede ser un id o email.'))

// Determina el tipo del parámetro y envía la petición al distribuidor.
PATCH.patch('/:field', [
    body(['name', 'email']).isEmpty(), atLeastOneField,
    param('field', 'ismongo').not().isMongoId(),
    param('field', 'isemail').not().isEmail(),
    patchQueryDist ])
    
PATCH.patch('/id/:id', [
    param('id').isMongoId(), mongoIdCheckr,
    body(['name', 'email']).isEmpty(), atLeastOneField,
], patchById)

PATCH.patch('/email/:email',[
    body(['name', 'email']).isEmpty(), atLeastOneField,
], patchByEmail)
module.exports = { PATCH }