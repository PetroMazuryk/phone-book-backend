import express from "express";
import validateBody from "../helpers/validateBody.js";
import ctrl from "../controllers/callsControllers.js";
import { createCallSchema } from "../schemas/callsSchemas.js";

const callsRouter = express.Router();

callsRouter.delete("/:contactId/calls/:callId", ctrl.deleteCall);

callsRouter.post(
  "/:contactId/calls",
  validateBody(createCallSchema),
  ctrl.addCall
);

export default callsRouter;
