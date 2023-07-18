import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';


describe('Pessoas - GetById', () => {

    let cidade_id: number | undefined = undefined;
    let accessToken = '';
    let usuario_id: number | undefined = undefined;

    beforeAll(async () => {
        const email = 'getbyid-pessoas@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({ nome: 'Teste', sobrenome: 'Getbyid', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        usuario_id = usuario.body;
        accessToken = signInRes.body.accessToken;

        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Teste1' });

        cidade_id = resCidade.body;
    });

    it('Tenta consultar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .get('/pessoas/1')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Busca registro por id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidade_id,
                nome: 'Juca',
                email: 'jucagetbyid@gmail.com',
                sobrenome: 'Silva'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');

        await deleteTestes(Number(res1.body), 'pessoa');
    });

    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/pessoas/99999')
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