const express = require('express');
const cors = require('cors');
require('colors');

const { connectDb } = require('../database/connect.database');
const { Router } = require('../routes/main.routes');

class Server {

    api = express();

    /**
     * @author Marcos Rodríguez Yélamo <marcosylrg@gmail.com>
     * 
     * Lanza una instancia del servidor.
     * Si se le pasa un número (menor o igual a 65535), se ejecutará en dicho puerto.
     * Segunda parte de la prueba, métodos innecesarios omitidos.
     * 
     * @param {number} port Puerto a través del que el servidor escuchará las peticiones.
     */
    constructor(port = process.env.PORT){
        this.port = port;
        connectDb()
            .then(() => this.load())
            .catch((err) => console.error(err));
    }

    middlewares() {
        this.api.use(cors());
        this.api.use(express.json())
    }

    routes() {
        this.api.use(Router)
    }

    load() {
        try {
            this.api = express();
            this.middlewares();
            this.routes();
            this.run();
        } catch (error) {
            console.error(error);
        }
    }

    run() {
        this.api = this.api.listen(this.port, () => {
            console.log(` Servidor escuchando por el puerto ${this.port} `.bgBlue);
        })
    }
}

module.exports = Server;