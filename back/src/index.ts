import dotenv from 'dotenv';
dotenv.config();
import Server from './server/server';

const server = new Server(Number(process.env.PORT) || 3000);

server.listen();