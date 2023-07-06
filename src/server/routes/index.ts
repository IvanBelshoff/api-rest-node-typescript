import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.status(StatusCodes.OK).send('Tudo certo');
});

router.post('/cidades', CidadesController.createValidation, CidadesController.create);

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);

router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);

router.put('/cidades/:id', CidadesController.updataByIdValidation, CidadesController.updataById);

router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);

export { router };