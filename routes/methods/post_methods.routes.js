const { check, body } = require('express-validator');
const { insert } = require('../../controllers/post_methods.controller');
const { emptyBodyFields, invalidFields } = require('../../middlewares/errorValidator.middleware');

const POST = require('express').Router();

// Crea una nueva persona.
POST.post('/', [
    body(['email', 'name']).notEmpty(), emptyBodyFields,
    body('email').isEmail(), invalidFields], insert);

module.exports = { POST };