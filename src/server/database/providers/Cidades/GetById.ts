import { Cidade } from '../../entities';
import { cidadeRepository } from '../../repositories';

export const getById = async (id: number): Promise<Cidade | Error> => {
    try {
        const result = await cidadeRepository.findOne({
            where: {
                id: id
            }
        });

        if (result) {
            return result;
        }
        
        return new Error('Registro não encontrado');

    } catch (error) {
        console.log(error);
        return new Error('Registro não encontrado');
    }
};