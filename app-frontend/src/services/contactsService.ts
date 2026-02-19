import axios from "axios";
import store from "../store";
import { setContactsList } from "../store/contactsSlice";
import { Contact, ContactInteraction } from "../types/CRM";
import { API_URL, apiHandler } from "./apiService";

export const createContact = async (contact: Contact) => {
  const resData = await apiHandler(
    axios.post(`${API_URL}/contacts`, {
      ...contact,
    }),
  );
  return resData.contact;
};

export const getAgentContacts = async () => {
  const resData = await apiHandler(axios.get(`${API_URL}/contacts`));
  store.dispatch(setContactsList(resData.contacts));
  return resData.contacts;
};

export const getContact = async (contactId: string) => {
  const resData = await apiHandler(
    axios.get(`${API_URL}/contacts/${contactId}`),
  );
  return {
    contact: resData.contact,
    interactions: resData.interactions,
  };
};

export const updateContact = async (contact: Contact) => {
  const { id, ...contactDetails } = contact;
  const resData = await apiHandler(
    axios.put(`${API_URL}/contacts/${id}`, contactDetails),
  );
  return resData.contact;
};

export const deleteContact = async (contactId: string) => {
  await apiHandler(axios.delete(`${API_URL}/contacts/${contactId}`));
  return true;
};

export const createInteraction = async (interaction: ContactInteraction) => {
  const resData = await apiHandler(
    axios.post(`${API_URL}/interactions`, interaction),
  );
  return resData.interaction;
};
