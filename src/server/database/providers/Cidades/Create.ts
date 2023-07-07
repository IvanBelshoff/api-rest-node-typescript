import { Cidade } from '../../entities';
import { cidadeRepository } from '../../repositories';

export const create = async (cidade: Omit<Cidade, 'id'>): Promise<number | Error> => {

    try {
        const newcidade = cidadeRepository.create(cidade);

        const result = await cidadeRepository.save(newcidade);

        if( typeof result === 'object'){
            return result.id;
        }else if(typeof result === 'number'){
            return result;
        }

        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }


};