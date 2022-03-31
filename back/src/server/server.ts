import express from 'express';

export default class Server{

    private app: express.Application;
    private port: number;

    constructor(port: number){
        this.app = express();
        this.port = port;
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }
}

