import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Cidades - Create', () => {

    it('Cria registro', async () => {

        const res1 = await testServer.post('/cidades').send({
            nome: 'Viana'
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('string');

        await deleteTestes(Number(res1.body), 'cidade');
    });

    it('Tenta criar registro com nome muito curto', async () => {

        const res1 = await testServer.post('/cidades').send({
            nome: 'vi'
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');

    });

});

