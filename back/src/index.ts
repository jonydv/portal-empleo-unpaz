import 'dotenv/config';
import Server from './server/server';

const server = new Server(Number(process.env.PORT!));

server.listen();