import * as Yup from 'yup';

const createAddressValidation = Yup.object({
  street: Yup.string().max(255).optional(),
  city: Yup.string().max(100).optional(),
  province: Yup.string().max(100).optional(),
  country: Yup.string().max(100).required(),
  postal_code: Yup.string().max(10).required(),
});

const updateAddressValidation = Yup.object({
  id: Yup.number().min(1).positive().required(),
  street: Yup.string().max(255).optional(),
  city: Yup.string().max(100).optional(),
  province: Yup.string().max(100).optional(),
  country: Yup.string().max(100).required(),
  postal_code: Yup.string().max(10).required(),
});

const getAddressValidation = Yup.number().min(1).positive().required();

export { createAddressValidation, updateAddressValidation, getAddressValidation };
