import { prismaClient } from '../application/database.js';
import {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
} from '../validation/contact-validation.js';
import { validate } from '../validation/validation.js';
import { ResponseError } from '../error/response-error.js';

const create = async (username, request) => {
  const contact = await validate(createContactValidation, request);
  contact.username = username;

  return await prismaClient.contact.create({
    data: contact,
    omit: {
      username: true,
    },
  });
};

const get = async (username, contactId) => {
  contactId = await validate(getContactValidation, contactId);
  const contact = await prismaClient.contact.findUnique({
    where: {
      username: username,
      id: contactId,
    },
    omit: {
      username: true,
    },
  });

  if (!contact) throw new ResponseError(404, 'contact is not found');
  return contact;
};

const update = async (username, request) => {
  const contact = await validate(updateContactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: username,
      id: contact.id,
    },
  });

  if (totalContactInDatabase <= 0) throw new ResponseError(404, 'Contact is not found');

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    omit: {
      username: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = await validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findUnique({
    where: {
      username: user,
      id: contactId,
    },
  });

  if (contact <= 0) throw new ResponseError(404, 'Contact is not found');

  return prismaClient.contact.delete({
    where: {
      username: user,
      id: contact.id,
    },
  });
};

export default { create, get, update, remove };
