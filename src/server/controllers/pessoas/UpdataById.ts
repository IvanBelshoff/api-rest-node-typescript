import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoasProvider } from '../../database/providers/Pessoas';
import { validation } from '../../shared/middlewares';
import { IBodyPropsPessoaGlobal, IParamsPropsGlobal } from '../../shared/interfaces';

export const updateByIdValidation = validation(get => ({
    body: get<IBodyPropsPessoaGlobal>(yup.object().shape({
        email: yup.string().required().email(),
        nome: yup.string().required().min(3),
        sobrenome: yup.string().required().min(3),
        cidade_id: yup.number().integer().required(),
    })),
    params: get<IParamsPropsGlobal>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamsPropsGlobal, {}, IBodyPropsPessoaGlobal>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await PessoasProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};