import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Pessoas - UpdateById', () => {

    let cidade_id: number | undefined = undefined;
    let accessToken = '';
    let usuario_id: number | undefined = undefined;

    beforeAll(async () => {
        const email = 'updatebyid-pessoas@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({ nome: 'Teste', sobrenome: 'Updatebyid', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        usuario_id = usuario.body;
        accessToken = signInRes.body.accessToken;

        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Teste1' });

        cidade_id = resCidade.body;
    });

    it('Tenta atualizar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .put('/pessoas/1')
            .send({
                cidadeId: 1,
                email: 'juca@gmail.com',
                nomeCompleto: 'Juca silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: 'Juca',
                email: 'jucaupdate@gmail.com',
                sobrenome: 'Silva',
                cidade_id
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
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
            .set({ Authorization: `Bearer ${accessToken}` })
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
        await deleteTestes(Number(usuario_id), 'usuario');
    });
});