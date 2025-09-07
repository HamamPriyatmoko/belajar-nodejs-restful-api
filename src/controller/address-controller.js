import addressService from '../service/address-service.js';

const create = async (req, res, next) => {
  try {
    const username = req.user.username;
    const contactId = req.params.contactId;
    const request = req.body;

    await addressService.create(username, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const username = req.user.username;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = req.params.addressId;

    const result = await addressService.update(username, contactId, request);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user.username;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    const result = await addressService.get(user, contactId, addressId);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const user = req.user.username;
    const contactId = req.params.contactId;
    const result = await addressService.list(user, contactId);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user.username;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    const result = await addressService.remove(user, contactId, addressId);
    res.status(200).json({ data: 'OK' });
  } catch (error) {
    next(error);
  }
};
export default {
  create,
  update,
  get,
  list,
  remove,
};
