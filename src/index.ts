/* eslint-disable quotes */
import { server } from './server/Server';
import 'reflect-metadata';
import { AppDataSource } from './server/database';

AppDataSource.initialize().then(() => {
    console.log(`\nBanco de dados conectado`);

    server.listen(process.env.PORT, async () => {
        console.log(`\nServidor rodando no endereço: http://${process.env.HOST}:${process.env.PORT}\n`);
    });
}).catch((error) => {

    if (error.code == String("3D000")) {
        console.log(error);
    }
});
