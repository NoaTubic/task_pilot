import { Request, Response, NextFunction } from 'express';
import activeMQService from '../services/activeMqService';


const activemqMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, body } = req;
  const message = JSON.stringify({ method, url, body });

  activeMQService.sendMessage('requests', message);

  res.on('finish', () => {
    const responseMessage = JSON.stringify({ statusCode: res.statusCode, statusMessage: res.statusMessage });
    activeMQService.sendMessage('responses', responseMessage);
  });

  next();
};

export default activemqMiddleware;
