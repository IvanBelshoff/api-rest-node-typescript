import { cidadeRepository } from '../../repositories';

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await cidadeRepository.findOne({
            where: {
                id: id
            }
        });

        if (result) {
            await cidadeRepository.delete({ id: id });
            return;
        }
        
        return new Error('Erro ao apagar o registro');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao apagar o registro');
    }
};