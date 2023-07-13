import { setSeederFactory as pessoaSeederFactory } from 'typeorm-extension';
import { Cidade, Pessoa } from '../entities';

export default pessoaSeederFactory(Pessoa, async (faker) => {

    const cidade = new Cidade();
    cidade.id = 1;
    cidade.nome = 'Marechal';

    const nome = faker.person.firstName().toLowerCase();
    const sobrenome = faker.person.lastName().toLowerCase();
    const email = `${nome}.${sobrenome}@exemple.com`;

    const pessoa = new Pessoa();
    pessoa.nome = nome;
    pessoa.sobrenome = sobrenome;
    pessoa.email = email;
    pessoa.cidade = cidade;

    return pessoa;
});

