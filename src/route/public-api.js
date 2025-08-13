import express from 'express';
import userController from '../controller/user-controller.js';

const publicRouter = new express.Router();
publicRouter.post('/api/user', userController.register);
publicRouter.post('/api/user/login', userController.login);

export { publicRouter };
