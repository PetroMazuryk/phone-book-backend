import { createUser, findUserByEmail } from "../services/usersServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  const newUser = createUser({ email, password });

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser.id,
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
      email: user.email,
    },
  });
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
};
