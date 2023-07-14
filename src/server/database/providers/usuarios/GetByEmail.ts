import { Usuario } from '../../entities';
import { usuarioRepository } from '../../repositories';

export const getByEmail = async (email: string): Promise<Usuario | Error> => {
    try {

        const result = await usuarioRepository.findOne({
            where: {
                email: email
            }
        });

        if (result) return result;

        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }
};