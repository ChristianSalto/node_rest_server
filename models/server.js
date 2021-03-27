const express = require('express');
const cors = require('cors');

class Server {

  constructor() {
    this.app = express();
    this.userPath = '/api/users';

    this.middlewares();

    // Rutas de mi aplicacion 
    this.routes();

  }

  middlewares() {

    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {

    this.app.use(this.userPath, require('../routes/users'))

  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`server running port ${process.env.PORT}`);
    });
  }

}


module.exports = Server;