import { IBodyPropsUsuarios } from '../../../shared/interfaces';
import { PasswordCrypto } from '../../../shared/services';
import { usuarioRepository } from '../../repositories';

export const create = async (usuario: IBodyPropsUsuarios): Promise<number | Error> => {
    try {
        
        const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

        const newUsuario = usuarioRepository.create({
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            email: usuario.email,
            senha: hashedPassword
        });

        const result = await usuarioRepository.save(newUsuario);

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }  
};