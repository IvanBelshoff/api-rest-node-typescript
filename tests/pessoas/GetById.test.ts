import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - GetById', () => {
    let cidade_id: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' });

        cidade_id = resCidade.body;
    });


    it('Busca registro por id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidade_id,
                nome: 'Juca',
                email: 'jucagetbyid@gmail.com',
                sobrenome: 'Silva'
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/pessoas/${res1.body}`)
            .send();
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');
    });
    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/pessoas/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});