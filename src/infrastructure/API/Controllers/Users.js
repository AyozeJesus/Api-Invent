/* eslint-disable no-unused-vars */
import { generateError } from "../../../domain/utils/helpers.js";
import UserService from "../../../domain/services/UserService.js";
import { userSchema, loginSchema } from "../Schemas/usersSchemas.js";
import { v4 as uuidv4 } from "uuid";

const userService = new UserService();

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

export const newUserController = async (req, res, next) => {
  try {
    const { username, email, password, category } = req.body;

    if (category !== "trabajador" && category !== "administrador") {
      throw generateError(
        'Invalid category. Category must be "trabajador" or "administrador."',
        400
      );
    }

    const token = generateActivationToken();
    const userId = await userService.createUser({
      username,
      email,
      password,
      category,
    });
    res.status(200).json({ message: "User registered successfully.", userId });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 404);
    }
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    if (!user) {
      throw generateError("Invalid email or password.", 401);
    }
    const token = await userService.login(email, password);
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
    const user = await userService.getUserById(user_id);
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

    const users = await userService.getUsersByCategory(category);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
