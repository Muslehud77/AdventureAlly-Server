/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import bcrypt from "bcrypt"
import { TUser, TUserResponse } from '../User/user.interface';
import { User } from '../User/user.model';
import { TUserSignIn } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import configs from '../../configs';
import { generateToken } from './auth.utils';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  const user = await User.findById({ _id: result._id }).select(
    '-isDeleted -status -__v',
  ) as TUser & {_id:string};

   const payload = {
     id: user._id,
     role: user.role,
   } as JwtPayload;

  const accessToken = generateToken(
    payload,
    configs.jwt_access_secret,
    configs.jwt_access_expiresIn,
  );

   const refreshToken = generateToken(
     payload,
     configs.jwt_refresh_secret,
     configs.jwt_refresh_expiresIn,
   );

  return { user, accessToken, refreshToken };
};

const signIn = async (userData: TUserSignIn) => {
  const isUserExist = (await User.findOne({
    email: userData.email,
  }).select("+password")) as TUserResponse;
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }



  const checkPassword =await bcrypt.compare(userData.password, isUserExist?.password)

  if(!checkPassword){
     throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!');
  }

  //checking is user blocked/deleted
  await User.isUserHasAccess(isUserExist?._id);

  const payload = {
    id: isUserExist._id,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    payload,
    configs.jwt_access_secret,
    configs.jwt_access_expiresIn,
  );

  const refreshToken = generateToken(
    payload,
    configs.jwt_refresh_secret,
    configs.jwt_refresh_expiresIn,
  );

  const user = {...isUserExist._doc}

  const { isDeleted, password, status, ...rest } = user;

 
  
  return { rest, accessToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
  const decode = jwt.verify(
    refreshToken,
    configs.jwt_refresh_secret,
  ) as JwtPayload;

  //checking is user exist/blocked/deleted
  const user = (await User.isUserHasAccess(decode.id)) as TUserResponse;

  const payload = {
    id: user._id,
    role: user.role,
  };

  const token = generateToken(
    payload,
    configs.jwt_access_secret,
    configs.jwt_access_expiresIn,
  );

  return token;
};

export const authServices = {
  createUserIntoDB,
  signIn,
  refreshToken,
};
