import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';


describe('Pessoas - GetAll', () => {
    let cidade_id: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste3' });

        cidade_id = resCidade.body;
    });


    it('Busca registros', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                email: 'jucagetall@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva'
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/pessoas')
            .send();
        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);

        await deleteTestes(Number(res1.body), 'pessoa');
    });

    afterAll(async () => {
        await deleteTestes(Number(cidade_id), 'cidade');
    });

});