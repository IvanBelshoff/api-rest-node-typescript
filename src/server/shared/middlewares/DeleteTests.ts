import { cidadeRepository, pessoaRepository, usuarioRepository } from '../../database/repositories';

type TType = 'usuario' | 'cidade' | 'pessoa';

export async function deleteTestes(id: number, tipo: TType): Promise<number> {

    if (tipo === 'cidade') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const cidadeExcluida = await cidadeRepository.delete({ id: id }).then((result) => {
            console.log('Cidade foi excluida');

        }).catch((error) => {
            console.log('Cidade não foi excluida');
            console.log(error);
        });

        return id;
    } else if (tipo === 'usuario') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const usuarioExcluido = await usuarioRepository.delete({ id: id }).then((result) => {
            console.log('Usuario foi excluido');

        }).catch((error) => {
            console.log('Usuário não foi excluido');
            console.log(error);
        });
        return id;
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pessoaExcluida = await pessoaRepository.delete({ id: id }).then((result) => {
            console.log('Pessoa foi excluida');

        }).catch((error) => {
            console.log('Pessoa não foi excluida');
            console.log(error);
        });
        return id;
    }



}