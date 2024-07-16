import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TUser } from "./user.interface";
import { userServices } from "./user.service";


const updateUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const userId = req.user.id

  const result = await userServices.updateUserIntoDB(userId,userData) as TUser;

  const data = {
    success: true,
    statusCode: 200,
    message: 'User updated successfully',
    data: result,
  };

  sendResponse<TUser>(res, data);
});

const changeStatus = catchAsync(async (req, res) => {


  const id = req.params.id
  const status = req.body

  const result = (await userServices.changeStatusOfUserInDB(
    id,
    status,
  )) as TUser;

  const data = {
    success: true,
    statusCode: 200,
    message: 'User status updated successfully',
    data: result,
  };

  sendResponse<TUser>(res, data);
});



const deleteUser = catchAsync(async (req, res) => {
    const userId = req.params.id;

  const result = await userServices.deleteUserInDB(userId);

  const data = {
    success: true,
    statusCode: 200,
    message: 'User deleted successfully',
    data: result,
  };
  sendResponse(res, data);
});

const getAllUsers = catchAsync(async (req, res) => {
  

  const result = await userServices.getAllUsersFromDB();

  const data = {
    success: true,
    statusCode: 200,
    message: 'Users retrieved successfully',
    data: result,
  };
  sendResponse(res, data);
});

export const userController = {
  updateUser,
  deleteUser,
  getAllUsers,
  changeStatus,

};