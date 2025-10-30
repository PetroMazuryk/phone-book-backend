import { createUser, findUserByEmail } from "../services/usersServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

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

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid email or password." });
    return;
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

export const getCurrentUser = async (req, res) => {
  const { userId } = req;

  if (!userId) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const user = findUserById(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  });
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
};
