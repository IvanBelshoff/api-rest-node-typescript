import { pessoaRepository } from '../../repositories';

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await pessoaRepository.findOne({
            where: {
                id: id
            }
        });

        if (result) {
            await pessoaRepository.delete({ id: id });
            return;
        }

        return new Error('Erro ao apagar o registro');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao apagar o registro');
    }
};