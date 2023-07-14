import { Pessoa } from '../../entities';
import { pessoaRepository } from '../../repositories';

export const getAll = async (page: number, limit: number, filter: string): Promise<Pessoa[] | Error> => {
    try {

        const result = pessoaRepository.createQueryBuilder('pessoa')
            .leftJoinAndSelect('pessoa.cidade', 'cidade')
            .orderBy('pessoa.id', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .where('pessoa.nome like :nome', { nome: `%${filter}%` })
            .getMany();

        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};