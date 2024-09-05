import { Request, Response, NextFunction } from 'express';
import { logger, consoleLogger } from '../config/logger';

const requestResponseLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  const oldWrite = res.write;
  const oldEnd = res.end;
  const chunks: Buffer[] = [];

  res.write = function (chunk: any, encoding?: any, callback?: any) {
    if (typeof chunk === 'string') {
      chunk = Buffer.from(chunk, encoding || 'utf8');
    }
    chunks.push(chunk);
    return oldWrite.call(res, chunk, encoding, callback);
  };

  res.end = function (chunk: any, encoding?: any, callback?: any) {
    if (chunk) {
      if (typeof chunk === 'string') {
        chunk = Buffer.from(chunk, encoding || 'utf8');
      }
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString('utf8');
    let parsedBody;

    try {
      parsedBody = JSON.parse(body);
    } catch (e) {
      parsedBody = body;
    }

    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      requestBody: req.body,
      responseBody: parsedBody,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    };

    if (res.statusCode >= 400) {
      logger.error(logData);
    }
    consoleLogger.info(logData);

    return oldEnd.call(res, chunk, encoding, callback);
  };

  next();
};

export default requestResponseLogger;
