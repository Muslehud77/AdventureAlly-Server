import { Router } from 'express';
import { UserRouter } from '../Modules/User/user.route';
import { AuthRouts } from '../Modules/Auth/auth.route';
import { ProductRoutes } from '../Modules/Product/product.route';
import { CartRoutes } from '../Modules/Cart/cart.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },

  {
    path: '/auth',
    route: AuthRouts,
  },

  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/carts',
    route: CartRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
