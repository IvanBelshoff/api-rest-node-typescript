import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { deleteTestes } from '../../src/server/shared/middlewares';

describe('Cidades - GetById', () => {
    let accessToken = '';
    let usuario_id: number | undefined = undefined;

    beforeAll(async () => {
        const email = 'getbyid-cidades@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({ nome: 'Teste', sobrenome: 'GetById', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        usuario_id = usuario.body;
        accessToken = signInRes.body.accessToken;
    });

    it('Tenta consultar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .get('/cidades/1')
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Viana' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');

        await deleteTestes(Number(res1.body), 'cidade');
    });
    
    it('Tenta buscar registro que não existe', async () => {

        const res1 = await testServer
            .get('/cidades/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

    afterAll(async () => {
        await deleteTestes(Number(usuario_id), 'usuario');
    });

});