import { AppDataSource } from '../data-source';
import { Usuario } from '../entities';

export const usuarioRepository = AppDataSource.getRepository(Usuario);