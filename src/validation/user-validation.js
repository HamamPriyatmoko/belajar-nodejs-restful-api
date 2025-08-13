import * as Yup from 'yup';

const registerUserValidation = Yup.object({
  username: Yup.string().max(100).required(),
  password: Yup.string().max(100).required(),
  name: Yup.string().max(100).required(),
});

const loginUserValidation = Yup.object({
  username: Yup.string().max(100).required(),
  password: Yup.string().max(100).required(),
});

const getUserValidation = Yup.string().max(100).required();

const updateUserValidation = Yup.object({
  username: Yup.string().max(100).required(),
  password: Yup.string().max(100).optional(),
  name: Yup.string().max(100).optional(),
});

export { registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation };
