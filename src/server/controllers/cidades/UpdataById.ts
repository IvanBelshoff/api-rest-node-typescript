import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { CidadesProvider } from '../../database/providers/Cidades';
import { IBodyPropsCidadeGlobal, IParamsPropsGlobal } from '../../shared/interfaces';


export const updataByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyPropsCidadeGlobal>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
    params: getSchema<IParamsPropsGlobal>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));

export const updataById = async (req: Request<IParamsPropsGlobal, {}, IBodyPropsCidadeGlobal>, res: Response) => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        });
    }

    const result = await CidadesProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};
