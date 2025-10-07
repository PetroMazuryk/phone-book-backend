import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateFavoriteById,
  updatePriorityById,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ result, message: "Delete success" });
};

const createContact = async (req, res) => {
  const { name, phone, favorite = false } = req.body;

  if (!name || !phone) {
    throw HttpError(400, "Name and phone are required");
  }

  const result = await addContact(name, phone, favorite);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactById(id, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    throw HttpError(400, "Field 'favorite' must be boolean");
  }

  const result = await updateFavoriteById(id, favorite);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updatePriority = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    throw HttpError(400, "Field 'favorite' must be boolean");
  }

  const result = await updatePriorityById(id, favorite);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  updatePriority: ctrlWrapper(updatePriority),
};
