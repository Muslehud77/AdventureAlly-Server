import express from 'express';
import { Auth } from '../../Middlewares/auth';
import { validateRequest } from '../../Middlewares/validateRequest';
import {
  createCartValidationSchema,
  createPaymentIntentValidation,
} from './cart.validation';
import { cartController } from './cart.controller';

const router = express.Router();

router.post(
  '/',
  Auth('user'),
  validateRequest(createCartValidationSchema),
  cartController.addCart,
);
router.post(
  '/payment',
  Auth('user'),
  validateRequest(createPaymentIntentValidation),
  cartController.payment,
);

router.get('/my-cart', Auth('user'), cartController.getMyCart);

router.get('/', Auth('admin'), cartController.getAllCarts);

router.patch('/:id/:status', Auth('admin'), cartController.changeStatus);

router.get('/statistics', Auth('admin'), cartController.getDashboardStats);

export const CartRoutes = router;
