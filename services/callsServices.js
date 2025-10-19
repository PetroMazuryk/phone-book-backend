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
