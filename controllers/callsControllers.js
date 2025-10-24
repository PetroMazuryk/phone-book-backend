import { removeCall, addCallService } from "../services/callsServices.js";

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

export const addCall = async (req, res) => {
  const { contactId } = req.params;
  const newCallData = req.body;

  const result = await addCallService(contactId, newCallData);

  if (!result) {
    throw HttpError(404, "Contact not found or call not added");
  }

  res.status(201).json({
    result,
    message: "Call added successfully",
  });
};

export const editCall = async (req, res) => {
  const { contactId, callId } = req.params;
  const updatedFields = req.body;

  const result = await editCallService(contactId, callId, updatedFields);

  if (!result) {
    throw HttpError(404, "Call not found or not updated");
  }

  res.status(200).json({
    result,
    message: "Call updated successfully",
  });
};

export default {
  deleteCall: ctrlWrapper(deleteCall),
  addCall: ctrlWrapper(addCall),
  editCall: ctrlWrapper(editCall),
};
