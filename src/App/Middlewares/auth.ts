import httpStatus from "http-status"
import AppError from "../errors/AppError"
import catchAsync from "../utils/catchAsync"
import configs from "../configs";
import { User } from "../Modules/User/user.model";
import { TRequiredRoles } from "../Modules/Auth/auth.interface";
import { TUserResponse } from "../Modules/User/user.interface";
import { catchJWTError } from "../utils/catchJWTError";
import { JwtPayload } from "jsonwebtoken";


export const Auth = (...requiredRoles: TRequiredRoles[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    const decode = catchJWTError(token,configs.jwt_access_secret)

    //checking is user exist/blocked/deleted
    const isUserHasAccess = (await User.isUserHasAccess(
      decode.id,
    )) as TUserResponse;

    if (requiredRoles && !requiredRoles.includes(isUserHasAccess.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = decode as JwtPayload

    next()
  });
};