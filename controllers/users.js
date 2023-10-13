const { generateError } = require("../helpers");
const {
  createUser,
  login,
  getUserById,
  getUserByEmail,
} = require("../db/users");
const { v4: uuidv4 } = require("uuid");

const {
  userSchema,
  loginSchema,
  getUserSchema,
} = require("../schemas/usersSchemas");
const generateActivationToken = () => {
  return uuidv4();
};

const validateNewUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    throw generateError(error.details[0].message, 400);
  }
  next();
};
const createNewUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const token = generateActivationToken();
    const userId = await createUser({ username, email, password });
    res.status(200).json({ message: "User registered successfully.", userId });
  } catch (err) {
    next(err);
  }
};

const newUserController = [validateNewUser, createNewUser];

const loginController = async (req, res, next) => {
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

const getUserController = async (req, res, next) => {
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

module.exports = {
  newUserController,
  loginController,
  getUserController,
};
