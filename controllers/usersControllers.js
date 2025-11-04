import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  readUsers,
  writeUsers,
} from "../services/usersServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Name, email and password are required." });
    return;
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    res.status(409).json({ message: "User with this email already exists." });
    return;
  }

  const newUser = createUser({ name, email, password });

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

  const users = readUsers();
  const updatedUsers = users.map((u) =>
    u.id === user.id ? { ...u, token } : u
  );
  writeUsers(updatedUsers);

  res.status(200).json({
    message: "Login successful",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  });
};

export const logoutUser = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  removeUserToken(user.id);

  res.status(200).json({ message: "Logout successful" });
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
};
