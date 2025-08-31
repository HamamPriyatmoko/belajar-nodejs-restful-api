import contactService from '../service/contact-service.js';

const create = async (req, res, next) => {
  try {
    const result = await contactService.create(req.user.username, req.body);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await contactService.get(req.user.username, req.params.contactId);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = contactId;
    const user = req.user.username;

    const result = await contactService.update(user, request);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await contactService.remove(req.user.username, req.params.contactId);
    res.status(200).json({ data: 'OK' });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user.username;

    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      size: req.query.size,
      page: req.query.page,
    };

    const result = await contactService.search(user, request);
    res.status(200).json({ data: result.data, paging: result.paging });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
