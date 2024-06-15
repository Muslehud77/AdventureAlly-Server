import express from 'express';
import { validateRequest } from '../../Middlewares/validateRequest';
import { userValidation } from '../User/user.validation';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post('/signup',validateRequest(userValidation.createUserValidation),authController.createUser);
router.post('/signin',validateRequest(authValidation.UserSignInValidation),authController.userSignIn);
router.post('/refreshToken',authController.refreshToken);




export const AuthRouts = router;
