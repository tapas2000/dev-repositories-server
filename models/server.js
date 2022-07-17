const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {

        this.paths = {
            auth: '/api/auth',
            repository: '/api/categories',
        }
        this.app = express();

        //connect to bd
        this.connectDb();
        //middlewares        
        // this.middlewares();
        //Read and parse of body
        this.app.use(express.json());
        //routes
        this.routes();
    }
    async connectDb() {
        await dbConnection();
    }
    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.route'))
    }
    middlewares() {

        //CORS 
        this.app.use(cors());
        //Public directory
        this.app.use(express.static('public'))
    }
    startlistening() {
        console.error("-----------",process.env.PORT);

        this.app.listen(8080, () => {
            console.log("App listening...");
        });
    }
}


module.exports = Server;