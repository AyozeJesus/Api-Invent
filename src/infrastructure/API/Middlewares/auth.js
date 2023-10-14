import { generateError } from "../helpers.js";

import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError(
        "No authorized. You must be a registered user to perform this action.",
        401
      );
    }
    let token;
    try {
      token = jwt.verify(
        authorization.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );
    } catch (e) {
      console.error(e);
      throw generateError("Token invalid", 401);
    }

    req.userId = token.userId;
    req.userEmail = token.userEmail;
    req.Name = token.Name;
    req.lastName = token.lastName;
    req.userUsername = token.userUsername;

    next();
  } catch (error) {
    next(error);
  }
};
