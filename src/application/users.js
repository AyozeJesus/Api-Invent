import { UserRepository } from "../domain/repository/UserRepository.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser({ username, email, password, category }) {
    return this.userRepository.createUser({
      username,
      email,
      password,
      category,
    });
  }

  async login(email, password) {
    return this.userRepository.login(email, password);
  }

  async getUserById(userId) {
    return this.userRepository.getUserById(userId);
  }

  async getUserByEmail(email) {
    return this.userRepository.getUserByEmail(email);
  }

  async getUsersByCategory(category) {
    return this.userRepository.getUsersByCategory(category);
  }
}

export default UserService;
