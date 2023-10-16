/* eslint-disable no-unused-vars */
import { generateError } from "../../../application/helpers.js";
import {
  createUser,
  login,
  getUserById,
  getUserByEmail,
  getUsersByCategory,
} from "../../../application/users.js";
import { userSchema, loginSchema } from "../schemas/usersSchemas.js";
import { v4 as uuidv4 } from "uuid";

export const generateActivationToken = () => {
  return uuidv4();
};

export const validateNewUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    throw generateError(error.details[0].message, 400);
  }
  next();
};
export const createNewUser = async (req, res, next) => {
  try {
    const { username, email, password, category } = req.body;

    if (category !== "trabajador" && category !== "administrador") {
      throw generateError(
        'Invalid category. Category must be "trabajador" or "administrador."',
        400
      );
    }

    const token = generateActivationToken();
    const userId = await createUser({ username, email, password, category });
    res.status(200).json({ message: "User registered successfully.", userId });
  } catch (err) {
    next(err);
  }
};

export const newUserController = [validateNewUser, createNewUser];

export const loginController = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      throw generateError("Invalid email or password.", 401);
    }
    const token = await login(email, password);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const getUserController = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    if (Number(req.userId) !== Number(user_id)) {
      throw generateError(
        "Unauthorized! You do not have permission to modify another user's data.",
        403
      );
    }
    const user = await getUserById(user_id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsersByCategoryController = async (req, res, next) => {
  try {
    const { category } = req.params;

    if (category !== "trabajador" && category !== "administrador") {
      throw generateError(
        'Invalid category. Category must be "trabajador" or "administrador."',
        400
      );
    }

    const users = await getUsersByCategory(category);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
