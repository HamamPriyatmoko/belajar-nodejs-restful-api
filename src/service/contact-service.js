import { prismaClient } from '../application/database.js';
import { contactValidation } from '../validation/contact-validation.js';
import { validate } from '../validation/validation.js';

const create = async (user, request) => {
  const contact = await validate(contactValidation, request);
  contact.username = user.username;

  return await prismaClient.contact.create({
    data: contact,
    omit: {
      username: true,
    },
  });
};

export default { create };
