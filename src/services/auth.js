import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { User } from "../models/user.js";

async function registerUser(user) {
  const maybeUser = await User.findOne({ email: user.email });
  if (maybeUser !== null) {
    throw createHttpError(409, "Email is already in use");
  }
  user.password = await bcrypt.hash(user.password, 10);

  return User.create(user);
}

async function loginUser(email, password) {
  const maybeUser = await User.findOne({ email });

  if (maybeUser === null) {
    throw createHttpError(404, "User is not found");
  }

  const isMatch = await bcrypt.compare(password, maybeUser.password);

  if (isMatch === false) {
    throw createHttpError(401, "Unauthorized (password is incorrect)");
  }
}

export { registerUser, loginUser };
