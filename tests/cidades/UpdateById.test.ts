import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Cidades - UpdateById', () => {

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'Viana' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({ nome: 'Viana' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);

        await deleteTestes(Number(res1.body), 'cidade');
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/cidades/99999')
            .send({ nome: 'Viana' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});