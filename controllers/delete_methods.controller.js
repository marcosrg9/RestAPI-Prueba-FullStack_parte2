const { request, response } = require('express');
const personModel = require('../models/person.model');

/**
 * Busca un documento por el id y lo elimina.
 */
const deleteById = (req = request, res = response) => {
    const id = req.params.id || req.params.field;
    personModel.findByIdAndDelete({ _id: id })
        .then((a) => {
            if (!a || a.length == 0) res.status(404).json(`No se ha encontrado ningún documento con el id ${id}`);
            else res.json(`${a.name} ha sido eliminado de la colección.`);
        })
        .catch((err) => res.status(500).json(err));
}

/**
 * Busca un documento por el email y lo elimina.
 */
const deleteByEmail = (req = request, res = response) => {
    const email = req.params.email || req.params.field;
    personModel.findOneAndDelete({email})
        .then((a) => {
            if (!a || a.length == 0) res.status(404).json(`No se ha encontrado ningún documento con el correo electrónico ${email}`);
            else res.json(`El documento con el correo electrónico ${a.email} ha sido eliminado de la colección.`);
        })
        .catch((err) => res.status(500).json(err));
}

module.exports = { deleteById, deleteByEmail };