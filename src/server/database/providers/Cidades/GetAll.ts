import { Cidade } from '../../entities';
import { cidadeRepository } from '../../repositories';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<Cidade[] | Error> => {
    try {
        const result = await cidadeRepository.createQueryBuilder('cidade')
            .orderBy('cidade.id', 'ASC')
            .skip((page - 1) * limit)
            .take(limit)
            .where('cidade.nome like :nome', { nome: `%${filter}%` })
            .andWhere('cidade.id = :id', { id: id })
            .getMany();



        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await cidadeRepository.createQueryBuilder('cidade')
                .where('cidade.id = :id', { id: id })
                .getOne();

            if (resultById) {
                return [...result, resultById];
            }
        }

        return result;
        
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};