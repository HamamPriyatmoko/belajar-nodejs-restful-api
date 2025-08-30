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

export { createContactValidation, getContactValidation, updateContactValidation };
