import { Response } from "express"



type TData<T> = {
    success: boolean;
    statusCode : number;
    message : string;
    data : T
    token? : string
}

export const sendResponse = <T>(res: Response, data: TData<T>) => {

  if(!Object.keys(data).length){
     res.status(404).json({
       success: false,
       statusCode: 404,
       message: 'No Data Found',
       data: [],
     });
  }
  
  console.log(data);

  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data?.message || 'Request Successful',
    data: data.data,
    ...(data.token && {token : data?.token})
  });
};