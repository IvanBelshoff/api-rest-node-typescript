import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController, PessoasController } from '../controllers';
import { UsuariosController } from '../controllers/usuarios';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (_, res) => {
    return res.status(StatusCodes.OK).send('Tudo certo');
});

router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updataByIdValidation, CidadesController.updataById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);
router.get('/usuarios', ensureAuthenticated, UsuariosController.getAllValidation, UsuariosController.getAll);

export { router };