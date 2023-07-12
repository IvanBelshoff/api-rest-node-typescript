import { Cidade } from '../../entities';
import { cidadeRepository } from '../../repositories';


export const updateById = async (id: number, cidade: Omit<Cidade, 'id' |'pessoa'>): Promise<void | Error> => {
    try {
        const result = await cidadeRepository.findOne({
            where: {
                id: id
            }
        });

        if (result) {
            await cidadeRepository.update({id: id},cidade);
            return;
        }
        
        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};