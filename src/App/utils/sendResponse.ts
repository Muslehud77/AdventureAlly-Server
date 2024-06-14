import { Response } from "express"



type TData<T> = {
    success: boolean;
    statusCode : number;
    message : string;
    data : T
}

export const sendResponse = <T>(res: Response, data: TData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data?.message || 'Request Successful',
    data: data.data,
  });
};