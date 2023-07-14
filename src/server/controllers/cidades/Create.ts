import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { CidadesProvider } from '../../database/providers/cidades';
import { IBodyPropsCidadeGlobal } from '../../shared/interfaces';

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyPropsCidadeGlobal>(yup.object().shape({
        nome: yup.string().required().min(3).max(150)
    }))
}));

export const create = async (req: Request<{}, {}, IBodyPropsCidadeGlobal>, res: Response) => {

    const result = await CidadesProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
