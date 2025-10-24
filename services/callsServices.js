import { nanoid } from "nanoid";
import { listContacts, updateListContacts } from "./contactsServices.js";

export const removeCall = async (contactId, callId) => {
  const contacts = await listContacts();

  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) return null;

  const callIndex = contact.calls.findIndex(({ id }) => id === callId);
  if (callIndex === -1) return null;

  const [removedCall] = contact.calls.splice(callIndex, 1);
  await updateListContacts(contacts);

  return removedCall;
};

export const addCallService = async (contactId, newCall) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) return null;

  const callWithId = { id: nanoid(), ...newCall };
  if (!contact.calls) contact.calls = [];
  contact.calls.push(callWithId);

  await updateListContacts(contacts);
  return callWithId;
};

export const editCallService = async (contactId, callId, updatedFields) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) return null;

  if (!contact.calls) return null;

  const callIndex = contact.calls.findIndex((c) => c.id === callId);
  if (callIndex === -1) return null;

  contact.calls[callIndex] = {
    ...contact.calls[callIndex],
    ...updatedFields,
  };

  await updateListContacts(contacts);

  return contact.calls[callIndex];
};
