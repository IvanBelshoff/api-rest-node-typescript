import { Pessoa } from '../../entities';
import { pessoaRepository } from '../../repositories';

export const getById = async (id: number): Promise<Pessoa | Error> => {
    try {
        const result = await pessoaRepository.findOne({
            where: {
                id: id
            },
            relations:{
                cidade: true
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