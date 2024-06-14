export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TSimplifiedError = {
    statusCode: number;
    message: string;
    errorSource:TErrorSource
}


export type TErrorHandler = (err:any) => TSimplifiedError