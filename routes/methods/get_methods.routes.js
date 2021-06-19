const { param } = require('express-validator');
const { findAll, findById ,matchAll, findByName, findByEmail, matchEmail, matchName } = require('../../controllers/get_methods.controller');
const { mongoIdCheckr } = require('../../middlewares/mongoIdChecker.middleware');
const { getQueryDist } = require('../../middlewares/query_distributor.middleware');

const GET = require('express').Router()

// Listar todas las personas.
GET.get('/', findAll);

// Listar una persona concreta por su Id.
GET.get('/id/:id', [
    param('id', 'El id no es válido.').isMongoId(),
    mongoIdCheckr], findById);

// Listar una persona concreta por su nombre.
GET.get('/name/:name', findByName);

// Listar una persona concreta por su correo electrónico.
GET.get('/email/:email', findByEmail);

// Realiza una búsqueda filtrando el tipo de parámetro.
GET.get('/:field', [
    param('field', 'ismongo').not().isMongoId(),
    param('field', 'isemail').not().isEmail(),
    getQueryDist
]);

// Realiza una búsqueda devolviendo documentos que contengan parte de la consulta en algún campo.
GET.get('/match/:query', matchAll);

// Realiza una búsqueda devolviendo documentos que contengan parte de la consulta en el email.
GET.get('/match/email/:email', matchEmail);

// Realiza una búsqueda devolviendo documentos que contengan parte de la consulta en el nombre.
GET.get('/match/name/:name', matchName);

module.exports = { GET };