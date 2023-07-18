import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';


describe('Pessoas - GetAll', () => {

    let cidade_id: number | undefined = undefined;
    let accessToken = '';
    let usuario_id: number | undefined = undefined;

    beforeAll(async () => {
        const email = 'getall-pessoas@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({ nome: 'Teste', sobrenome: 'Getall', email, senha: '123456' });
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
            .get('/pessoas')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Busca registros', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidade_id,
                email: 'jucagetall@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva'
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);

        await deleteTestes(Number(res1.body), 'pessoa');
    });

    afterAll(async () => {
        await deleteTestes(Number(cidade_id), 'cidade');
        await deleteTestes(Number(usuario_id), 'usuario');
    });

});