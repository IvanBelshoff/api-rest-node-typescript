import { usuarioRepository } from '../../repositories';

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const count = await usuarioRepository.createQueryBuilder('usuario')
            .select('usuario')
            .where('usuario.nome like :nome', { nome: `%${filter}%` })
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