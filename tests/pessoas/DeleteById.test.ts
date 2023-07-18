import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';


describe('Pessoas - DeleteById', () => {

    let cidade_id: number | undefined = undefined;
    let accessToken = '';
    let usuario_id: number | undefined = undefined;

    beforeAll(async () => {
        const email = 'delete-pessoas@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({ nome: 'Teste', sobrenome: 'Delete', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        usuario_id = usuario.body;
        accessToken = signInRes.body.accessToken;

        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Teste1' });

        cidade_id = resCidade.body;
    });

    it('Tenta apagar registro sem usar token de autenticação', async () => {
        const res1 = await testServer
            .delete('/pessoas/1')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Apaga registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidade_id,
                email: 'jucadelete@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva'
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    
    it('Tenta apagar registro que não existe', async () => {
        const res1 = await testServer
            .delete('/pessoas/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

    afterAll(async () => {
        await deleteTestes(Number(cidade_id), 'cidade');
        await deleteTestes(Number(usuario_id), 'usuario');
    });
});