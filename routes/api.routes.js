const API = require('express').Router();

// Este método de carga de rutas produce errores. No carga todas las rutas.
/* API.route('/')
    .get(require('./methods/get_methods.routes').GET)
    .post(require('./methods/post_methods.routes').POST)
    .put(require('./methods/put_methods.routes').PUT)
    .patch(require('./methods/patch_methods.routes').PATCH)
    .delete(require('./methods/delete_methods.routes').DELETE)
 */

// Carga las rutas de todos los métodos.
API.use('/', require('./methods/head_methods.routes').HEAD);
API.use('/', require('./methods/get_methods.routes').GET);
API.use('/', require('./methods/post_methods.routes').POST);
API.use('/', require('./methods/put_methods.routes').PUT);
API.use('/', require('./methods/patch_methods.routes').PATCH);
API.use('/', require('./methods/delete_methods.routes').DELETE);

// Responde al resto de rutas que no son controladas.
API.all('*', (req, res) => res.status(400).json('Compruebe la ruta y/o el método.'))

module.exports = { API };