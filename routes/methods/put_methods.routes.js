const { check, param } = require('express-validator');
const { putByEmail, putById } = require('../../controllers/put_methods.controller');
const { emptyBodyFields, invalidFields } = require('../../middlewares/errorValidator.middleware');
const { mongoIdCheckr } = require('../../middlewares/mongoIdChecker.middleware');
const { putQueryDist } = require('../../middlewares/query_distributor.middleware');

const PUT = require('express').Router();

PUT.put('/', (req, res) => { res.status(400).json({'error': `Debe introducir un parámetro. Puede usar el id o bien el email.`}) })

// Determina el contenido del parámetro y actualiza los datos del documento.
PUT.put('/:field',[
    check(['name', 'email']).not().isEmpty(), emptyBodyFields,
    param('field', 'ismongo').not().isMongoId(),
    param('field', 'isemail').not().isEmail(),
    putQueryDist ])

// Actualiza el documento completo por el id.
PUT.put('/id/:id',[
    param('field', 'El id no es válido.').not().isMongoId(), mongoIdCheckr,
    check(['name', 'email']).not().isEmpty(), emptyBodyFields,
], putById)

// Actualiza el documento completo por el email.
PUT.put('/email/:email', [
    check(['name', 'email']).not().isEmpty(), emptyBodyFields,
], putByEmail)

module.exports = { PUT };