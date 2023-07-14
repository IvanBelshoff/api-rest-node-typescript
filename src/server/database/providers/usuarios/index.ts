import * as getByEmail from './GetByEmail';
import * as create from './Create';
import * as getAll from './GetAll';
import * as count from './Count';

export const UsuariosProvider = {
    ...getByEmail,
    ...create,
    ...getAll,
    ...count
};