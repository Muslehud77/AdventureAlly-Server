import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TUser } from "./user.interface";
import { userServices } from "./user.service";


const updateUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const userId = req.params.id

  const result = await userServices.updateUserIntoDB(userId,userData) as TUser;

  const data = {
    success: true,
    statusCode: 200,
    message: 'User upgraded successfully',
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


export const userController = {
  updateUser,
  deleteUser
}