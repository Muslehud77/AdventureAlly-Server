import { ErrorRequestHandler } from 'express';
import configs from '../configs';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import { TErrorHandler, TErrorSource } from '../interface/error';
import { handleZodError } from './customErrorHandlerFunctions/zodError';
import { handleMongooseDuplicateData } from './customErrorHandlerFunctions/mongooseDuplicateDataError';
import { mongooseCastError } from './customErrorHandlerFunctions/mongooseCastError';
import { handleMongooseValidation } from './customErrorHandlerFunctions/mongooseValidationError';
import { handleMongooseQueryFieldError } from './customErrorHandlerFunctions/mongooseQueryError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  const handleError = (errorHandler: TErrorHandler) => {
    const simplifiedError = errorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  };

  if (err instanceof ZodError) {
    // zod error handler
    handleError(handleZodError);
  } else if (err?.name === 'ValidationError') {
    // mongoose validation error
    handleError(handleMongooseValidation);
  } else if (err?.name === 'CastError') {
    // mongoose invalid type of input //castError
    handleError(mongooseCastError);
  } else if (err?.code === 11000) {
    // E11000 duplicate key error (while we enter duplicate data to DB)
    handleError(handleMongooseDuplicateData);
  } else if (err?.code === 31254) {
    // mongoose query error
    handleError(handleMongooseQueryFieldError);
  } else if (err instanceof AppError || err instanceof Error) {

    if (err.message === 'You have no access to this route'){
      return res.status(statusCode).json({
        success: false,
        statusCode,
        message: message,
      });
    }else{
      statusCode = err instanceof AppError && err.statusCode;
      message = err?.message;
      errorSource = [
        {
          path: '',
          message: err?.message,
        },
      ];
    }
      
  }

  console.log(err);
 

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    err,
    stack: configs.node_env === 'development' ? err?.stack : null,
  });
};
