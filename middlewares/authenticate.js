import jwt from "jsonwebtoken";
import { findUserById } from "../services/usersServices.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticate = (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = findUserById(id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
