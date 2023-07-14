import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';


describe('Pessoas - Create', () => {
    let cidade_id: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste1' });

        cidade_id = resCidade.body;
    });


    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                email: 'juca@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        deleteTestes(Number(res1.body),'pessoa');
    });

    it('Cadastra registro 2', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'juca2@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        deleteTestes(Number(res1.body),'pessoa');
    });
    it('Tenta criar registro com email duplicado', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'jucaduplicado@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                email: 'jucaduplicado@gmail.com',
                nome: 'Juca',
                sobrenome: 'dublicado',
            });
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');

        deleteTestes(Number(res1.body),'pessoa');
    });
    it('Tenta criar registro com nome muito curto', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                email: 'juca@gmail.com',
                nome: 'Ju',
                sobrenome: 'Silva'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
    it('Tenta criar registro sem nome', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                email: 'juca@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
    it('Tenta criar registro sem email', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                nome: 'Juca',
                sobrenome: 'Silva'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro com email inválido', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                email: 'juca gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Tenta criar registro sem cidade_id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                email: 'juca@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidade_id');
    });
    it('Tenta criar registro com cidade_id inválido', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id: 'teste',
                email: 'juca@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidade_id');
    });
    it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
        expect(res1.body).toHaveProperty('errors.body.cidade_id');
        expect(res1.body).toHaveProperty('errors.body.nome');
        expect(res1.body).toHaveProperty('errors.body.sobrenome');
    });

    afterAll(async () => {
        deleteTestes(Number(cidade_id),'cidade');
    });
  
});