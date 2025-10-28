import express from "express";

import ctrl from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  userRegisterSchema,
  userLoginSchema,
} from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(userRegisterSchema),
  ctrl.registerUser
);
usersRouter.post("/login", validateBody(userLoginSchema), ctrl.loginUser);

export default usersRouter;
