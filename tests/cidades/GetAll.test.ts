import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Cidades - GetAll', () => {

    let accessToken = '';
    let usuario_id: number | undefined = undefined;

    beforeAll(async () => {
        const email = 'getall-cidades@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({ nome: 'Teste', sobrenome: 'GetAll', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        usuario_id = usuario.body;
        accessToken = signInRes.body.accessToken;
    });

    it('Tenta consultar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .get('/cidades')
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Buscar todos os registros', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Viana' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);

        await deleteTestes(Number(res1.body), 'cidade');
    });

    afterAll(async () => {
        await deleteTestes(Number(usuario_id), 'usuario');
    });
});