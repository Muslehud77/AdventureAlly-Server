
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../errors/AppError";
import httpStatus from "http-status";

export const catchJWTError = (token:string,secret:string)=>{
    let decode = {} as JwtPayload
    try{
         decode = jwt.verify(token,secret) as JwtPayload;
    }catch(error:any){
        throw new AppError(
          httpStatus.UNAUTHORIZED, error.message ||
          'You have no access to this route',
        );
    }

    return decode

}