const { Schema, model } = require('mongoose');

const personSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
}, { versionKey: false });

/**
 * Filtra el campo _id y devuelve todo el conjunto con id en vez de _id.
 */
personSchema.methods.toJSON = function() {
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Person', personSchema);