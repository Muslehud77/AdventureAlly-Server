import { TSimplifiedError } from '../../interface/error';

export const handleMongooseQueryFieldError = (err: any): TSimplifiedError => {
  const message = 'Invalid Field';
  const statusCode = 400;

  const errorSource = [
    {
      path: '',
      message: err?.message,
    },
  ];

  
  return {
    statusCode,
    message,
    errorSource,
  };
};
