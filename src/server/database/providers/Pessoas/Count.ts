import { pessoaRepository } from '../../repositories';

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const count = await pessoaRepository.createQueryBuilder('pessoa')
            .select('pessoa')
            .where('pessoa.nome like :nome', { nome: `%${filter}%` })
            .getCount();

        if (Number.isInteger(Number(count))) {
            return Number(count);
        }

        return new Error('Erro ao consultar a quantidade total de registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registros');
    }
};