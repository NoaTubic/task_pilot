import { Request, Response, NextFunction } from 'express';

const setHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
};

export default setHeaders;
