import express from "express";

import ctrl from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userRegisterSchema } from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(userRegisterSchema),
  ctrl.registerUser
);
usersRouter.post("/login", ctrl.loginUser);

export default usersRouter;
