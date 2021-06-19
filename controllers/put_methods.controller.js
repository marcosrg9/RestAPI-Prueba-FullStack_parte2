const { request, response } = require('express');
const personModel = require('../models/person.model');

/**
 * Actualiza el conjunto de datos completo por el Id.
 */
const putById = (req = request, res = response) => {
    const document = req.body;
    const id = req.params.field || req.params.id;
    personModel.findByIdAndUpdate({ _id: id}, document)
    .then((a) => {
        if (!a || a.length == 0) {
            res.status(404).json(`No se ha encontrado ningún documento con el id ${id} para actualizar.`)
        } else res.json(`Se han actualizado los datos de ${a.name}.`);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

/**
 * Actualiza el conjunto de datos completo por el email.
 */
const putByEmail = (req = request, res = response) => {
    const document = req.body
    const email = req.params.field || req.params.email;
    personModel.findOneAndUpdate({ email }, document)
    .then((a) => {
        if (!a || a.length == 0) {
            res.status(404).json(`No se ha encontrado ningún documento con el email ${email} para actualizar.`)
        } else res.json(`Se han actualizado los datos de ${a.name}.`);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

module.exports = { putById, putByEmail}