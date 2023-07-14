import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Pessoas - UpdateById', () => {
    let cidade_id: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste5' });

        cidade_id = resCidade.body;
    });


    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Juca',
                email: 'jucaupdate@gmail.com',
                sobrenome: 'Silva',
                cidade_id
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nome: 'Juca',
                email: 'jucaupdates@gmail.com',
                sobrenome: 'Silva',
                cidade_id
            });
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);

        await deleteTestes(Number(res1.body), 'pessoa');
    });

    it('Tenta atualizar registro que não existe', async () => {
        const res1 = await testServer
            .put('/pessoas/99999')
            .send({
                cidade_id,
                email: 'juca@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva'
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

    afterAll(async () => {
        await deleteTestes(Number(cidade_id), 'cidade');
    });
});