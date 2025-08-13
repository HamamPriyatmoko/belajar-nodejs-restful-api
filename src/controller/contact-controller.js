import contactService from '../service/contact-service.js';

const create = async (req, res, next) => {
  try {
    const result = await contactService.create(req.user.username, req.body);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};
