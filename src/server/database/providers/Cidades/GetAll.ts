import { Cidade } from '../../entities';
import { cidadeRepository } from '../../repositories';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<Cidade[] | Error> => {
    try {


        const result = cidadeRepository.createQueryBuilder('cidade')
            .orderBy('cidade.id', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);

        if (id > 0) {
            result.where('cidade.id = :id', { id: id });
            result.andWhere('cidade.nome like :nome', { nome: `%${filter}%` });
        }else{
            result.where('cidade.nome like :nome', { nome: `%${filter}%` });
        }

        const cidades = await result.getMany();

        if (id > 0 && cidades.every(item => item.id !== id)) {

            const resultById = await cidadeRepository.findOne({
                where:{
                    id: id
                }
            });

            if (resultById) return [resultById];
        }

        return cidades;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};