import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Cidades - GetAll', () => {

    it('Buscar todos os registros', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'Viana' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/cidades')
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);

        await deleteTestes(Number(res1.body), 'cidade');
    });
});