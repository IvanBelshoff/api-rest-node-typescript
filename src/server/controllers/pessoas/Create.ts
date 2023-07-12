import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { PessoasProvider } from './../../database/providers/Pessoas';
import { validation } from '../../shared/middlewares';
import { IBodyPropsPessoaGlobal } from '../../shared/interfaces';

export const createValidation = validation(get => ({

    body: get<IBodyPropsPessoaGlobal>(yup.object().shape({
        nome: yup.string().required().min(3),
        email: yup.string().required().email(),
        sobrenome: yup.string().required().min(3),
        cidade_id: yup.number().integer().required().min(1),
    })),
}));

export const create = async (req: Request<{}, {}, IBodyPropsPessoaGlobal>, res: Response) => {
    const result = await PessoasProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(Number(result));
};