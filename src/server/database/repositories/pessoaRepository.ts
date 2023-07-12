import { AppDataSource } from '../data-source';
import { Pessoa } from '../entities';

export const pessoaRepository = AppDataSource.getRepository(Pessoa);