import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';


describe('Usuário - SignUp', () => {
    it('Cadastra usuário 1', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123456',
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'jucasilva@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        await deleteTestes(Number(res1.body), 'usuario');
    });
    it('Cadastra usuário 2', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123456',
                nome: 'Pedro',
                sobrenome: 'Rosa',
                email: 'pedro@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        await deleteTestes(Number(res1.body), 'usuario');
    });
    it('Erro ao cadastrar um usuário com email duplicado', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123456',
                nome: 'Pedro',
                sobrenome: 'Rosa',
                email: 'pedroduplicado@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123456',
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'pedroduplicado@gmail.com',
            });
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');

        await deleteTestes(Number(res1.body), 'usuario');
    });
    it('Erro ao cadastrar um usuário sem email', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123456',
                nome: 'Juca',
                sobrenome: 'Silva',
                // email: 'jucasilva@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Erro ao cadastrar um usuário sem nome', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123456',
                //nome: 'Juca',
                sobrenome: 'Silva',
                email: 'jucasilva@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
    it('Erro ao cadastrar um usuário sem senha', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                // senha: '123456',
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'jucasilva@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });
    it('Erro ao cadastrar um usuário com email inválido', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123456',
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'jucasilva gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Erro ao cadastrar um usuário com senha muito pequena', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123',
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'jucasilva@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });
    it('Erro ao cadastrar um usuário com nome muito pequeno', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                senha: '123456',
                nome: 'Ju',
                sobrenome: 'Silva',
                email: 'jucasilva@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});