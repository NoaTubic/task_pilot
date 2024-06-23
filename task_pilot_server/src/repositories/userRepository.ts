import User from '../models/user';

class UserRepository {
  async findByUsername(username: string) {
    return User.findOne({ where: { username } });
  }

  async create(user: { username: string; password: string }) {
    return await User.create(user);
  }

  async findById(id: string) {
    return User.findByPk(id);
  }
}

export default new UserRepository();
