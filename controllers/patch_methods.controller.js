const { request, response } = require('express');
const personModel = require('../models/person.model');

/**
 * Realiza una actualización parcial usando el id como parámetro de búsqueda.
 */
const patchById = (req = request, res = response) => {
    const update = req.body;
    const id = req.params.id || req.params.field;
    personModel.findByIdAndUpdate({_id: id}, { $set: update })
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json(`No se ha encontrado ningún documento con el id ${id}.`);
            } else res.json(`Se ha actualizado el documento de ${a.name}`);
        })
        .catch((err) => res.status(500).json(err));
};

/**
 * Realiza una actualización parcial usando el correo electrónico como parámetro de búsqueda.
 */
const patchByEmail = (req = request, res = response) => {
    const update = req.body;
    const email = req.params.email || req.params.field;
    personModel.findOneAndUpdate({email}, { $set: update })
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json(`El correo electrónico ${email} no existe en la base de datos.`);
            } else res.json(`Se ha actualizado el documento de ${a.name}`);
        })
        .catch((err) => res.status(500).json(err));
};

module.exports = { patchById, patchByEmail };