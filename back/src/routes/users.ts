import { Router } from 'express';
import { check } from 'express-validator';
import { getUsers, googleSignIn, loginUser, registerUser } from '../controllers/users';
import { emailAlreadyExistsValidator } from '../helpers/db-validators';
import validateDataFields from '../middlewares/validate-data-fields';

const userRoutes = Router();

userRoutes.get('/', getUsers);

userRoutes.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('surname', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(emailAlreadyExistsValidator),
    validateDataFields
],registerUser);

userRoutes.post('/login', [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateDataFields
], loginUser);

userRoutes.post('/google', [
    check('tokenId', 'El id token es necesario').not().isEmpty(),
    validateDataFields
], googleSignIn);

export default userRoutes;