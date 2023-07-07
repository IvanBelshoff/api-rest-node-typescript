import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { Cidade } from '../../database';
import { CidadesProvider } from '../../database/providers/Cidades';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<Cidade, 'id'>  {}

export const updataByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));

export const updataById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
 
    const result = await CidadesProvider.updataById(Number(req.params.id), req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};
