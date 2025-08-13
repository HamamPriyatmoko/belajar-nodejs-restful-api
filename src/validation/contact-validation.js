import * as Yup from 'yup';

const contactValidation = Yup.object({
  first_name: Yup.string().max(100).required(),
  last_name: Yup.string().max(100).optional(),
  email: Yup.string().max(200).email().optional(),
  phone: Yup.string().max(20).required(),
});

export { contactValidation };
