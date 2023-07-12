import { Cidade, Pessoa } from '../../database/entities';

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