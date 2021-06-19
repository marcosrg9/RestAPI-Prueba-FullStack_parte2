const { param } = require('express-validator');
const { deleteById, deleteByEmail } = require('../../controllers/delete_methods.controller');
const { mongoIdCheckr } = require('../../middlewares/mongoIdChecker.middleware');
const { deleteQueryDist } = require('../../middlewares/query_distributor.middleware');

const DELETE = require('express').Router();

// Muestra un mensaje para las peticiones sin parámetros.
DELETE.delete('/', (req, res) => { res.status(400).json({'error': `Debe introducir un parámetro. Puede usar el id o bien el email.`}) })

// Determina el tipo de parámetro y envía la petición al distribuidor.
DELETE.delete('/:field', [
    param('field', 'ismongo').not().isMongoId(),
    param('field', 'isemail').not().isEmail(),
    deleteQueryDist
]);

// Elimina un documento por su id.
DELETE.delete('/id/:id', [
    param('id').isMongoId(), mongoIdCheckr
], deleteById);

// Elimina un documento por su correo electrónico.
DELETE.delete('/email/:email', deleteByEmail);

module.exports = { DELETE };