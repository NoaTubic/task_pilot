import { Request, Response, NextFunction } from 'express';
import * as jwt from '../utils/jwt';
import CustomError from '../utils/customError';
import { logger } from '../config/logger';




export interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    logger.error('No token provided');
    return next(new CustomError(401, 'Access token is missing'));
  }

  try {
    const user = jwt.verifyAccessToken(token);
    req.user = user
    next();
  } catch (err) {
    logger.error('Access token verification failed', err);
    next(new CustomError(403, 'Invalid access token'));
  }
};

export { authenticateToken };

