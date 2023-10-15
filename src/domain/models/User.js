import { UserEmail } from "./UserEmail.js";
import { UserPassword } from "./UserPassword.js";

export class User {
  static create(
    id,
    username,
    name,
    last_name,
    address,
    gender,
    email,
    password
  ) {
    return new User(
      id,
      username,
      name,
      last_name,
      address,
      gender,
      email,
      UserPassword.fromPlain(password)
    );
  }

  constructor(id, username, name, last_name, address, gender, email, password) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.last_name = last_name;
    this.address = address;
    this.gender = gender;
    this.email = new UserEmail(email);
    this.password = password;
  }

  getId() {
    return this.id;
  }

  hasId(id) {
    return this.id === id;
  }

  hasName(name) {
    return this.name === name;
  }

  hasEmail(email) {
    return this.email.equals(new UserEmail(email));
  }

  hasPassword(plainPassword) {
    return this.password.compareWith(plainPassword);
  }

  getPassword() {
    return this.password;
  }
}
