import express from 'express';
import { Auth } from '../../Middlewares/auth';
import { validateRequest } from '../../Middlewares/validateRequest';
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from './product.validation';
import { productControllers } from './product.controller';

const router = express.Router();

router.post(
  '/',
  Auth('admin'),
  validateRequest(createProductValidationSchema),
  productControllers.createAProduct,
);
router.get(
  '/deleted-products',
  Auth('admin'),
  productControllers.getDeletedProducts,
);

router.get('/random-products', productControllers.getRandomProducts);
router.get('/best-selling', productControllers.getBestSelling);

router.get('/', productControllers.getAllProducts);

router.get('/:id', productControllers.getProductById);

router.patch(
  '/:id',
  Auth('admin'),
  validateRequest(updateProductValidationSchema),
  productControllers.updateProduct,
);

router.delete('/:id', Auth('admin'), productControllers.deleteProduct);

export const ProductRoutes = router;
