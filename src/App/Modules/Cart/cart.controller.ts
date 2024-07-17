import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { TCart } from './cart.interface';
import { cartServices } from './cart.service';

const addCart = catchAsync(async (req, res) => {
  const { id } = req.user;
  const cartData = req.body;

  const result = (await cartServices.addCartIntoDB(
    id,
    cartData,
  )) as unknown as TCart;

  const data = {
    success: true,
    statusCode: 200,
    message: 'Cart added successfully!',

    data: result,
  };

  sendResponse<TCart>(res, data);
});

const payment = catchAsync(async (req, res) => {

  const cartData = req.body;

  const result = await cartServices.stripePayment(cartData)

  const data = {
    success: true,
    statusCode: 200,
    message: 'Request processed successfully!',

    data: result,
  };

  sendResponse(res, data);
});

const getMyCart = catchAsync(async (req, res) => {
  const { id } = req.user;
    
  const result = (await cartServices.getMyCartFromDB(id)) as unknown as TCart[];

  const data = {
    success: true,
    statusCode: 200,
    message: 'User carts retrieved successfully!',
    data: result,
  };

  sendResponse<TCart[]>(res, data);
});

const getAllCarts = catchAsync(async (req, res) => {
  const result = (await cartServices.getAllCartsFromDB()) as unknown as TCart[];

  const data = {
    success: true,
    statusCode: 200,
    message: 'All the carts retrieved successfully!',
    data: result,
  };

  sendResponse<TCart[]>(res, data);
});
const getDashboardStats = catchAsync(async (req, res) => {
  const result = (await cartServices.getDashboardStatsFromDB())

  const data = {
    success: true,
    statusCode: 200,
    message: 'Here is the stats data!',
    data: result,
  };

  sendResponse(res, data);
});

const changeStatus = catchAsync(async (req, res) => {
  const { id, status } = req.params;

  const result = (await cartServices.changeStatusOfCartIntoDB(
    id,
    status,
  )) as unknown as TCart;

  const data = {
    success: true,
    statusCode: 200,
    message: 'Cart status updated successfully!',
    data: result,
  };

  sendResponse<TCart>(res, data);
});

export const cartController = {
  changeStatus,
  getAllCarts,
  getMyCart,
  addCart,
  getDashboardStats,
  payment,
};
