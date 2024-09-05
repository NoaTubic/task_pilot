import { Request, Response } from 'express';
import * as jwt from '../utils/jwt';
import UserService from '../services/authService';
import asyncHandler from '../utils/asyncHandler';
import { logger } from '../config/logger';
import { hashPassword, verifyPassword } from '../utils/passwordUtils';
import { deserialize, serialize } from '../utils/serialization';

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await UserService.findUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    logger.info(`Hashed Password during registration: ${hashedPassword}`);

    const deserializedUser = deserialize('User', { username, hashedPassword });
    logger.info(`Deserialized User: ${JSON.stringify(deserializedUser)}`);
    const user = await UserService.createUser({ username, password: hashedPassword });
    res.status(201).json(JSON.parse(serialize(user)));
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await UserService.findUserByUsername(username);

    if (!user) {
      logger.error('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.generateAccessToken(user);
    const refreshToken = jwt.generateRefreshToken(user);
    UserService.addRefreshToken(refreshToken);
    res.json({ accessToken, refreshToken });
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token || !UserService.isRefreshTokenValid(token)) return res.sendStatus(401);

    try {
      const tokens = await UserService.refreshAccessToken(token);
      res.json(tokens);
    } catch (err) {
      res.sendStatus(403);
    }
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;
    UserService.removeRefreshToken(token);
    res.sendStatus(204);
  });
}

export default new AuthController();
