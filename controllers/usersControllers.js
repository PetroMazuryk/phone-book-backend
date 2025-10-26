import { createUser } from "../services/usersServices.js";
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

export default {
  registerUser: ctrlWrapper(registerUser),
};
