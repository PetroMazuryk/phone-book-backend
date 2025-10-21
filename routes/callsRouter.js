import express from "express";
import ctrl from "../controllers/callsControllers.js";

const callsRouter = express.Router();

callsRouter.delete("/:contactId/calls/:callId", ctrl.deleteCall);

callsRouter.post("/:contactId/calls", ctrl.addCall);

export default callsRouter;
