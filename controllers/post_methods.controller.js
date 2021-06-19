const { request, response } = require('express');
const personModel = require('../models/person.model');

const insert = (req = request, res = response) => {
    const person = new personModel(req.body);
    personModel.exists({email: req.body.email})
        .then((a) => {
            if (a) res.status(409).json(`Ya existe una entrada con el email ${req.body.email}`);
            else {
                person.validate()
                    .then(() => {
                        person.save()
                            .then((a) => res.json(a) )
                            .catch((err) => {
                                res.status(500).json(err);
                            });
                    })
                    .catch(() => {
                        res.status(400).json(`No se ha podido validar el usuario que desea crear, revise los campos que faltan.`);
                    })
            }
        })
        .catch((err) => {
            res.json(`Error\n${err}`)
        })
}

module.exports = { insert };