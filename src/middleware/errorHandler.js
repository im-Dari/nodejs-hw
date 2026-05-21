import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('ERROR DETAILS:', err);
  const status = err.status || err.statusCode || 500;

  if (err instanceof HttpError) {
    return res.status(status).json({
      message: err.message,
    });
  }

  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
};