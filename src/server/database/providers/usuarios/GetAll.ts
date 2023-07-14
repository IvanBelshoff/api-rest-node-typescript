import { Usuario } from '../../entities';
import { usuarioRepository } from '../../repositories';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<Usuario[] | Error> => {
    try {

        const result = usuarioRepository.createQueryBuilder('usuario')
            .orderBy('usuario.id', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);

        if (id > 0) {
            result.where('usuario.id = :id', { id: id });
            result.andWhere('usuario.nome like :nome', { nome: `%${filter}%` });
        }else{
            result.where('usuario.nome like :nome', { nome: `%${filter}%` });
        }

        const usuarios = await result.getMany();

        if (id > 0 && usuarios.every(item => item.id !== id)) {

            const resultById = await usuarioRepository.findOne({
                where:{
                    id: id
                }
            });

            if (resultById) return [resultById];
        }

        return usuarios;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};