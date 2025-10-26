import express from "express";

import ctrl from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/register", ctrl.registerUser);

export default usersRouter;
