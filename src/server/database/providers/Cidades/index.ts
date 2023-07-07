import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as updataById from './UpdataById';
import * as deleteById from './DeleteById';
import * as count from './Count';

export const CidadesProvider = {
    ...create,
    ...deleteById,
    ...getById,
    ...updataById,
    ...getAll,
    ...count,
};