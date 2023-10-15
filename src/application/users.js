import { getConnection } from "../infrastructure/UserRepository/MySQLClient.js";
import { generateError } from "./helpers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const createUser = async ({ username, email, password }) => {
  let connection;
  try {
    connection = await getConnection();
    const [emailExist] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const [usernameExist] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (emailExist.length > 0 && usernameExist.length > 0) {
      throw generateError(
        `"Username" and "email" already exist in our database. Please enter a different username and email.`,
        409
      );
    }

    if (emailExist.length > 0) {
      throw generateError(
        `"Email" already exists in our database. Please enter a different email.`,
        409
      );
    }

    if (usernameExist.length > 0) {
      throw generateError(
        `"Username" already exists in our database. Please enter a different username.`,
        409
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertUserQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [insertResult] = await connection.query(insertUserQuery, [
      username,
      email,
      hashedPassword,
    ]);

    return insertResult.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const login = async (email, password) => {
  let connection;
  try {
    connection = await getConnection();

    const [users] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      throw generateError("Email or password is invalid.", 404);
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw generateError("Email or password is invalid.", 404);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        userUsername: user.username,
        userEmail: user.email,
        firstName: user.name,
        lastName: user.lastname,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return token;
  } catch (err) {
    console.log(err);
    throw generateError(
      "Email or password is incorrect, please check your data.",
      404
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const getUserById = async (userId) => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    connection.release();
    return rows[0];
  } finally {
    if (connection) connection.release();
  }
};

export const getUserByEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT *  FROM users WHERE email = ?
    `,
      [email]
    );

    if (result.length === 0) {
      throw generateError("There is no user with that email address.", 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};
