import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface User {
  id: string;
  username: string;
}

interface TokenPayload extends JwtPayload {
  id: string;
  username: string;
}

const generateAccessToken = (user: User): string => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '45m' });
};

const generateRefreshToken = (user: User): string => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: '7d' });
};

const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as TokenPayload;
};

const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as Secret) as TokenPayload;
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
