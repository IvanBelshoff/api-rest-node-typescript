import { Cidade, Pessoa, Usuario } from '../../database/entities';

export interface IBodyPropsPessoaGlobal extends Omit<Pessoa, 'id' | 'cidade'> { cidade_id: number }

export interface IBodyPropsCidadeGlobal extends Omit<Cidade, 'id' | 'pessoa'> { }

export interface IParamsPropsGlobal { id?: number }

export interface IQueryPropsGetAllGlobal {
    page?: number;
    limit?: number;
    filter?: string;
}

export interface IQueryPropsGlobal {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

export interface IBodyPropsUsuarioSignIn extends Omit<Usuario, 'id' | 'nome' |'data_criacao' | 'sobrenome'> { }

export interface IBodyPropsUsuarios extends Omit<Usuario, 'id' | 'data_criacao'> { }

export interface IJwtData {
    uid: number;
}

export type TType = 'usuario' | 'cidade' | 'pessoa';