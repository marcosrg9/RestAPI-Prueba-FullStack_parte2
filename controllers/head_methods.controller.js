const { request, response } = require('express');
const personModel = require('../models/person.model');

const findById = (req = request, res = response) => {
    const id = req.params.id || req.params.field;
    personModel.findById({_id: id})
        .then((a) => {
            if (!a || a.length == 0) res.sendStatus(404)
            else res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
}

const findByEmail = (req = request, res = response) => {
    email = req.params.email || req.params.field;
    personModel.findOne({email})
        .then((a) => {
            if (!a || a.length == 0) res.sendStatus(404)
            else res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
}

module.exports = { findById, findByEmail}