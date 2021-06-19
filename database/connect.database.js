const { connect } = require('mongoose');
require('colors');

/**
 * Conexión a la base de datos.
 * Conecta con el cluster de MongoDB Atlas. URI en la variable de entorno MONGO.
 */
const connectDb = async() => {
    try {
        await connect(process.env.MONGO, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.info(' Conexión establecida con MongoDB. '.bgGreen)
    } catch (error) {
        console.error(error)
        throw new Error(' Error al conectar a la base de datos '.bgRed)
    }
}

module.exports = { connectDb };
