import { TErrorSource } from "../../interface/error";

export const handleMongooseDuplicateData = (err:any)=>{
    const statusCode = 400;
  const pathRegex = /dup key: { (.+?): "([^"]+)" }/;
  const match =
    err?.errorResponse?.errmsg?.match(pathRegex) ||
    err?.message?.match(pathRegex);

 

  const errorSource: TErrorSource = [
    {
      path: match ? `${match[1]} : ${match[2]}` : '',
      message: err?.errorResponse?.errmsg || err?.message,
    },
  ];

  return {
    statusCode,
    message: 'Duplicate',
    errorSource,
  };
};
