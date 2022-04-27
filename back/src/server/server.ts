import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import userRoutes from '../routes/users';

export default class Server{

    private app: express.Application;
    private port: number;

    constructor(port: number){
        this.app = express();
        this.port = port;

        //Conectar a la base de datos
        this.connectDB();

        //Usar los middlewares de express y cors
        this.middlewares();

        //Utilizamos las rutas declaradas
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // Activamos el uso de cors para evitar estos errores cuando se realizen peticiones desde el front
        this.app.use(cors());

        // Usamos el json() para activar la lectura y parseo del tipo json
        this.app.use(express.json());

        //

    }

    routes(){
        this.app.use('/users', userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }
}

