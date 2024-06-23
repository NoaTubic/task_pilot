import UserRepository from '../repositories/userRepository';
import * as jwt from '../utils/jwt';

let refreshTokens: string[] = [];

class AuthService {
  async findUserByUsername(username: string) {
    return await UserRepository.findByUsername(username);
  }

  async findUserById(id: string) {
    return await UserRepository.findById(id);
  }

  async createUser(user: { username: string; password: string }) {
    return await UserRepository.create(user);
  }

  async refreshAccessToken(refreshToken: string) {
    const user = await jwt.verifyRefreshToken(refreshToken);
    const newAccessToken = jwt.generateAccessToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);


    this.removeRefreshToken(refreshToken);
    this.addRefreshToken(newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  addRefreshToken(token: string) {
    refreshTokens.push(token);
  }

  isRefreshTokenValid(token: string) {
    return refreshTokens.includes(token);
  }

  removeRefreshToken(token: string) {
    refreshTokens = refreshTokens.filter(t => t !== token);
  }
}

export default new AuthService();
