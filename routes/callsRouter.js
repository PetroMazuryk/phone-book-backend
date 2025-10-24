import express from "express";
import validateBody from "../helpers/validateBody.js";
import ctrl from "../controllers/callsControllers.js";
import { createCallSchema, editCallSchema } from "../schemas/callsSchemas.js";

const callsRouter = express.Router();

callsRouter.delete("/:contactId/calls/:callId", ctrl.deleteCall);

callsRouter.post(
  "/:contactId/calls",
  validateBody(createCallSchema),
  ctrl.addCall
);

callsRouter.put(
  "/:contactId/calls/:callId",
  validateBody(editCallSchema),
  ctrl.editCall
);

export default callsRouter;
