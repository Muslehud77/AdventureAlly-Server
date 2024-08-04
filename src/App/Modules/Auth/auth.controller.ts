import configs from '../../configs';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import {  TUserResponse } from '../User/user.interface';
import { authServices } from './auth.service';
import { TUser } from './../User/user.interface';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = (await authServices.createUserIntoDB(userData)) as unknown as {
    user: TUserResponse;
    accessToken: string;
    refreshToken : string
  }; ;
 
 res.cookie('refreshToken', result.refreshToken, {
   secure: configs.node_env === 'production',
   httpOnly: true,
   // sameSite:'none',
   maxAge: 1000 * 60 * 60 * 24 * 365,
 });

  const data = {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result.user,
    token: result.accessToken,
  };
  sendResponse<TUserResponse>(res, data);
});

const userSignIn = catchAsync(async (req, res) => {
  const userData = req.body;

  const { rest , accessToken, refreshToken } =
    await authServices.signIn(userData);

   res.cookie('refreshToken', refreshToken, {
     secure: configs.node_env === 'production',
     httpOnly: true,
     // sameSite:'none',
     maxAge: 1000 * 60 * 60 * 24 * 365,
   });


  const data = {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully!',
    data: rest as TUser,
    token: accessToken,
  };
  sendResponse<TUser>(res, data);
});


const refreshToken = catchAsync(async (req, res) => {

  const {refreshToken} = req.cookies

   const result = (await authServices.refreshToken(refreshToken)) 


  const data = {
    success: true,
    statusCode: 200,
    message: 'Token updated successfully',
    data:null,
    token : result
  };
  sendResponse(res, data);
});

const makeAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const password = req.body.password
  const currentUser = req.user
  const currentUserId = currentUser.id

  const result = (await authServices.makeAdminFromUser(
    id,
    currentUserId,
    password,
  )) as TUser;

  const data = {
    success: true,
    statusCode: 200,
    message: 'User role updated successfully',
    data: result,
  };

  sendResponse<TUser>(res, data);
});





export const authController = {
  createUser,
  userSignIn,
  refreshToken,
  makeAdmin,
};
