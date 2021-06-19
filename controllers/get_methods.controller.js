const { request, response } = require('express');
const { Types } = require('mongoose');
const personModel = require('../models/person.model');

/**
 * Devuelve todos los resultados de la colección personas.
 */
const findAll = (req = request, res = response) => {
    personModel.find({})
        .then((a) => {
            if(!a || a.length == 0) {
                res.json(`La colección está vacía`);
            } else res.json(a);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

/**
 * Busca a una persona por su Id.
 */
const findById = (req = request, res = response) => {
    const id = req.params.field || req.params.id;
    personModel.findById({_id: id})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json(`No se ha encontrado ninguna persona con el id ${id}`);
            } else res.json(a);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

/**
 * Busca a una persona por su email.
 */
const findByEmail = (req = request, res = response) => {
    const email = req.params.email || req.params.field;
    personModel.findOne({email})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json(`No se ha encontrado ninguna persona con el email ${email}`);
            } else res.json(a);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

/**
 * Busca a una persona por su nombre.
 */
const findByName = (req = request, res = response) => {
    const name = req.params.name || req.params.field;
    personModel.findOne({name})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json(`${name} no existe en la base de datos.`);
            } else res.json(a);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

/**
 * Devuelve todos los documentos que coincidan parcialmente (o total) con todos los campos en base al parámetro.
 */
const matchAll = (req = request, res = response ) => {
    const query = req.params.query;
    personModel.find({$or: [{ name: {$regex: `.*${query}.*`} }, { email: {$regex: `.*${query}.*`} }]})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json(`No se ha encontrado ninguna coincidencia con ${query}.`);
            } else res.json(a)
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

/**
 * Devuelve todos los documentos que coincidan parcialmente (o total) con el email en base al parámetro.
 */
const matchEmail = (req = request, res = response) => {
    const email = req.params.email;
    personModel.find({email: {$regex: `.*${email}.*`}})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json(`No se ha encontrado ninguna coincidencia con el email ${email}.`);
            } else res.json(a)
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

/**
 * Devuelve todos los documentos que coincidan parcialmente (o total) con el nombre en base al parámetro.
 */
const matchName = (req = request, res = response) => {
    const name = req.params.name;
    personModel.find({name: {$regex: `.*${name}.*`}})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json(`No se ha encontrado ninguna coincidencia con el nombre ${name}.`);
            } else res.json(a)
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports = {  findAll,
                    findById,
                    findByEmail,
                    findByName,
                    matchAll,
                    matchEmail,
                    matchName };