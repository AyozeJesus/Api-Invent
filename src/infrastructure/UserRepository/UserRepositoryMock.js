import UserRepository from "../../domain/repository/UserRepository";

export class UserRepositoryMock extends UserRepository {
  save() {}

  existsByEmail() {}

  findById() {}

  findByEmail() {}
}
