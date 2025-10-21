import { removeCall } from "../services/callsServices.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

export const deleteCall = async (req, res) => {
  const { contactId, callId } = req.params;

  const result = await removeCall(contactId, callId);

  if (!result) {
    throw HttpError(404, "Call not found");
  }

  res.status(200).json({
    result,
    message: "Call deleted successfully",
  });
};

export default {
  deleteCall: ctrlWrapper(deleteCall),
};
