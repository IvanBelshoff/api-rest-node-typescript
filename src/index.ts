import { server } from './server/Server';

server.listen(process.env.PORT,() => {
    console.log(`\nServidor rodando no endereço: http://${process.env.HOST}:${process.env.PORT}\n`);
});