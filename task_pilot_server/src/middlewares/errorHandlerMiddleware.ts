import { Request, Response, NextFunction } from 'express';


import CustomError from '../utils/customError';
import { logger } from '../config/logger';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  const message = err.message || 'Internal Server Error';
  const status = err.statusCode || 500;
  logger.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));

  res.status(status).json({
    status,
    message,

  });
};

export { errorHandler };
export default errorHandler;
