import { AppDataSource } from '../data-source';
import { Cidade } from '../entities';

export const cidadeRepository = AppDataSource.getRepository(Cidade);