/* eslint-disable quotes */
import { server } from './server/Server';
import 'reflect-metadata';
import { AppDataSource } from './server/database';
import { TypeORMError } from 'typeorm';

AppDataSource.initialize().then(() => {

    console.log(`\nBanco de dados conectado`);

    server.listen(process.env.PORT, () => {
        console.log(`\nServidor rodando no endereço: http://${process.env.HOST}:${process.env.PORT}\n`);
    });
}).catch((error: TypeORMError) => {
    console.log(error.message);
});
