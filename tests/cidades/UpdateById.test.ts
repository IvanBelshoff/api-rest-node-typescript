import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Cidades - UpdateById', () => {
    
    let accessToken = '';
    let usuario_id: number | undefined = undefined;

    beforeAll(async () => {
        const email = 'updatebyid-cidades@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({ nome: 'Teste', sobrenome: 'UpdateById', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        usuario_id = usuario.body;
        accessToken = signInRes.body.accessToken;
    });

    it('Tenta atualizar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .put('/cidades/1')
            .send({ nome: 'Teste' });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Viana' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Viana' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);

        await deleteTestes(Number(res1.body), 'cidade');
    });

    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/cidades/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Viana' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

    afterAll(async () => {
        await deleteTestes(Number(usuario_id), 'usuario');
    });
});