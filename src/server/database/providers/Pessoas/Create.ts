import { IBodyPropsPessoaGlobal } from '../../../shared/interfaces';
import { cidadeRepository, pessoaRepository } from '../../repositories';


export const create = async (pessoa: IBodyPropsPessoaGlobal): Promise<number | Error> => {

    try {

        const count = await cidadeRepository.find({
            where: {
                id: pessoa.cidade_id
            }
        });

        if (Number(count.length) === 0) {
            return new Error('A cidade usada no cadastro não foi encontrada');
        }

        const newPessoa = pessoaRepository.create({
            nome: pessoa.nome,
            sobrenome: pessoa.sobrenome,
            email: pessoa.email,
            cidade: {
                id: pessoa.cidade_id
            }
        });

        const result = await pessoaRepository.save(newPessoa);

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }


};