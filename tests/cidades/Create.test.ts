import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Cidades - Create', () => {
    let accessToken = '';
    let usuario_id: number | undefined = undefined;

    beforeAll(async () => {
        const email = 'create-cidades@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({ nome: 'Teste', sobrenome: 'Create', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        usuario_id = usuario.body;
        accessToken = signInRes.body.accessToken;

    });


    it('Tenta criar um registro sem token de acesso', async () => {
        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('string');

        await deleteTestes(Number(res1.body), 'cidade');
    });
    
    it('Tenta criar um registro com nome muito curto', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Ca' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    afterAll(async () => {
        await deleteTestes(Number(usuario_id), 'usuario');
    });
});