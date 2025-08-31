import { prismaClient } from '../application/database.js';
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
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

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user,
      id: contactId,
    },
  });

  if (!contact) throw new ResponseError(404, 'Contact is not found');

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const search = async (user, request) => {
  request = await validate(searchContactValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];
  filters.push({ username: user });

  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: { contains: request.name },
        },
        {
          last_name: { contains: request.name },
        },
      ],
    });
  }

  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }

  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalContact = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_item: totalContact,
      total_page: Math.ceil(totalContact / request.size),
    },
  };
};

export default { create, get, update, remove, search };
