import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as UpdateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as count from './Count';

export const PessoasProvider = {
    ...create,
    ...deleteById,
    ...getById,
    ...UpdateById,
    ...getAll,
    ...count,
};
