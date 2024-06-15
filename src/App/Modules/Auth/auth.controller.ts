import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TUser } from "../User/user.interface";
import { userServices } from "./auth.service";

const createUser= catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await userServices.createUserIntoDB(userData);

  const data = {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  };
  sendResponse<TUser>(res, data);
});


const userSignIn = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await userServices.createUserIntoDB(userData);

  const data = {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  };
  sendResponse<TUser>(res, data);
});