import Task from '../models/task';
import { logger } from '../config/logger';
import User from '../models/user';
import CustomError from './customError';

const classWhitelist: { [key: string]: any } = {
  'task': Task,
  'user': User
};

export const serialize = (obj: any): string => {
  const className = obj.constructor.name.toLowerCase();
  return JSON.stringify({ [className]: { ...obj.dataValues } });
};

export const deserialize = (className: string, data: any): any => {
  logger.info(`Deserializing class: ${className} with data: ${JSON.stringify(data)}`);

  const ClassReference = classWhitelist[className.toLowerCase()];
  if (!ClassReference) {
    throw new CustomError(400, `Unauthorized deserialization attempt for class: ${className}`);
  }

  const instance = new ClassReference();
  Object.keys(data).forEach(key => {
    instance[key] = data[key];
  });
  logger.info(`Deserialized instance: ${JSON.stringify(instance)}`);
  return instance;
};
