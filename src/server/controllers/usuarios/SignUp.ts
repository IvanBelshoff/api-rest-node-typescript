import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/providers/usuarios';
import { IBodyPropsUsuarios } from '../../shared/interfaces';
import { validation } from '../../shared/middlewares';

export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyPropsUsuarios>(yup.object().shape({
        nome: yup.string().required().min(3),
        sobrenome: yup.string().required().min(3),
        senha: yup.string().required().min(6),
        email: yup.string().required().email().min(5),
    })),
}));

export const signUp = async (req: Request<{}, {}, IBodyPropsUsuarios>, res: Response) => {
    const result = await UsuariosProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};