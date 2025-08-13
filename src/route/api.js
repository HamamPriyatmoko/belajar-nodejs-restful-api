import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import contactController from '../controller/contact-controller.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/api/user/current', userController.getUser);
userRouter.patch('/api/user/current', userController.update);
userRouter.delete('/api/user/logout', userController.logout);
userRouter.post('/api/contacts', contactController.create);

export { userRouter };
