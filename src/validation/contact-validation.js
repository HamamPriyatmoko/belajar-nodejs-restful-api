import * as Yup from 'yup';

const createContactValidation = Yup.object({
  first_name: Yup.string().max(100).required(),
  last_name: Yup.string().max(100).optional(),
  email: Yup.string().max(200).email().optional(),
  phone: Yup.string().max(20).optional(),
});

const getContactValidation = Yup.number().positive().required();

const updateContactValidation = Yup.object({
  id: Yup.number().positive().required(),
  first_name: Yup.string().max(100).optional(),
  last_name: Yup.string().max(100).optional(),
  email: Yup.string().max(200).email().optional(),
  phone: Yup.string().max(20).optional(),
});

const searchContactValidation = Yup.object({
  page: Yup.number().min(1).positive().default(1),
  size: Yup.number().min(1).positive().max(100).default(10),
  name: Yup.string().optional(),
  email: Yup.string().optional(),
  phone: Yup.string().optional(),
});

export {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
  searchContactValidation,
};
