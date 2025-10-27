import express from "express";

import ctrl from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/register", ctrl.registerUser);
usersRouter.post("/login", ctrl.loginUser);

export default usersRouter;
