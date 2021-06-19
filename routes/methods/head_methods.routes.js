const { param } = require('express-validator');
const { headQueryDist } = require('../../middlewares/query_distributor.middleware');

const HEAD = require('express').Router();

// Muestra un mensaje de error para las peticiones sin parámetros
HEAD.head('/', (req, res) => res.sendStatus(400));

HEAD.head('/:field', [
    (e, a, next) => console.log("Here", next()),
    param('field', 'ismongo').not().isMongoId(),
    param('field', 'isemail').not().isEmail(),
    headQueryDist
])

//HEAD.head('/as/dsa', (req, res) => { res.status(500).send("dsa")})

module.exports = { HEAD };