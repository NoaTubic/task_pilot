import { Request, Response, NextFunction } from 'express';

import CustomError from '../utils/customError';
import UserService from '../services/authService';
import { logger } from '../config/logger';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const checkAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      logger.error('User not authenticated');
      return next(new CustomError(401, 'User not authenticated'));
    }

    const user = await UserService.findUserById(req.user.id);

    if (!user) {
      logger.error('User not found');
      return next(new CustomError(404, 'User not found'));
    }

    if (!user.isAdmin) {
      logger.error('Admin access required');
      return next(new CustomError(403, 'Admin access required'));
    }

    next();
  } catch (err) {
    logger.error('Error checking admin status', err);
    next(new CustomError(500, 'Internal server error'));
  }
};

export { checkAdmin };
