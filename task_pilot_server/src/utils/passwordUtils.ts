import crypto from 'crypto';
import util from 'util';
import { logger } from '../config/logger';


const scrypt = util.promisify(crypto.scrypt);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedBuffer = (await scrypt(password, salt, 64)) as Buffer;
  const hashedPassword = `${salt}:${hashedBuffer.toString('hex')}`;
  logger.info(`Password: ${password}, Salt: ${salt}, Hashed Password: ${hashedPassword}`);
  return hashedPassword;
};

export const verifyPassword = async (plainPassword: string, storedHashedPassword: string): Promise<boolean> => {
  const [salt, key] = storedHashedPassword.split(':');
  const hashedBuffer = (await scrypt(plainPassword, salt, 64)) as Buffer;
  const isMatch = key === hashedBuffer.toString('hex');
  logger.info(`hased password: ${key}, hashed buffer: ${hashedBuffer.toString('hex')}`);
  logger.info(`Plain Password: ${plainPassword}, Stored Hashed Password: ${storedHashedPassword}, Match: ${isMatch}`);
  return isMatch;
};
