import { prismaClient } from '../application/database.js';
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from '../validation/address-validation.js';
import { getContactValidation } from '../validation/contact-validation.js';
import { validate } from '../validation/validation.js';
import { ResponseError } from '../error/response-error.js';

const checkContactMustExists = async (user, contactId) => {
  contactId = await validate(getContactValidation, contactId);

  const totalContact = await prismaClient.contact.count({
    where: {
      username: user,
      id: contactId,
    },
  });

  if (totalContact !== 1) throw new ResponseError(404, 'Contact is not found');

  return contactId;
};

const create = async (user, contactId, request) => {
  contactId = await checkContactMustExists(user, contactId);

  const address = await validate(createAddressValidation, request);
  address.contact_id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const get = async (user, contactId, addressId) => {
  contactId = await checkContactMustExists(user, contactId);
  addressId = await validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      id: addressId,
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) throw new ResponseError(404, 'Address Not Found');

  return address;
};

const update = async (user, contactId, request) => {
  contactId = await checkContactMustExists(user, contactId);
  const address = await validate(updateAddressValidation, request);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id,
    },
  });

  if (totalAddressInDatabase !== 1) throw new ResponseError(404, 'Address is not found');

  return prismaClient.address.update({
    where: {
      id: address.id,
    },
    data: {
      city: address.city,
      country: address.country,
      postal_code: address.postal_code,
      province: address.province,
      street: address.street,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const list = async (user, contactId) => {
  contactId = await checkContactMustExists(user, contactId);

  return prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const remove = async (user, contactId, addressId) => {
  contactId = await checkContactMustExists(user, contactId);
  addressId = await validate(getAddressValidation, addressId);

  const address = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId,
    },
  });

  if (address !== 1) throw new ResponseError(404, 'Address is not found');

  return prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

export default {
  create,
  update,
  get,
  list,
  remove,
};
