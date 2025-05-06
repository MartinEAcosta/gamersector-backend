
/*
Routes of Users
host + /api/users
*/
import { Router } from 'express';
import { check } from "express-validator";
import { createNewUser , reloadToken , loginUser } from '../controllers/UserController';
const router = Router();

import {validateFields} from '../middlewares/validateFields';
import validateJWT from '../middlewares/validateJWT';

router.post(
    '/new',
    [
        check('firstname' , "El nombre es obligatorio." ).notEmpty(),
        check('lastname' , "El apellido es obligatorio." ).notEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('password' , 'La contraseña debe tener como minimo 6 caracteres.').isLength({ min : 6 }),
        validateFields,
    ],
    createNewUser
);

router.post(
    '/',
    [        
        check('email', 'El email es obligatorio.').isEmail(),
        check('password' , 'La contraseña debe tener como minimo 6 caracteres.').isLength({ min : 6 }),
        validateFields,
    ],
    loginUser
);

router.get(
    '/renew',
    [

    ],
    reloadToken
);


export default router;