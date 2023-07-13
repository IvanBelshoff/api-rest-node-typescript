import { IBodyPropsPessoaGlobal } from '../../../shared/interfaces';
import { pessoaRepository } from '../../repositories';

export const updateById = async (id: number, pessoa: IBodyPropsPessoaGlobal): Promise<void | Error> => {
    try {
        const result = await pessoaRepository.findOne({
            where: {
                id: id
            }
        });

        if (result) {
            await pessoaRepository.update({ id: id }, {
                nome: pessoa.nome,
                email: pessoa.sobrenome,
                sobrenome: pessoa.sobrenome,
                cidade: {
                    id: pessoa.cidade_id
                }
            });
            return;
        }

        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};