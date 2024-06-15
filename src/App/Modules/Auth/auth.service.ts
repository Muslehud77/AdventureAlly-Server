import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser, TUserResponse } from '../User/user.interface';
import { User } from '../User/user.model';
import { TUserSignIn } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import configs from '../../configs';
import { generateToken } from './auth.utils';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const signIn = async (userData: TUserSignIn) => {
  const isUserExist = (await User.findOne({
    email: userData.email,
  })) as TUserResponse;
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
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

  const { isDeleted, status, ...user } = isUserExist;

  return { user, accessToken, refreshToken };
};


const refreshToken = async (refreshToken:string)=>{
  const decode = jwt.verify(
    refreshToken,
    configs.jwt_refresh_secret,
  ) as JwtPayload;

  //checking is user exist/blocked/deleted
  const user = await User.isUserHasAccess(decode.id) as TUserResponse;

  const payload = {
    id:user._id,
    role:user.role
  }

  const token = generateToken(payload,configs.jwt_access_secret,configs.jwt_access_expiresIn)

  return token

}




export const authServices = {
  createUserIntoDB,
  signIn,
  refreshToken,
};
