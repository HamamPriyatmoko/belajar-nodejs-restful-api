import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import contactController from '../controller/contact-controller.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// Users
userRouter.get('/api/user/current', userController.getUser);
userRouter.patch('/api/user/current', userController.update);
userRouter.delete('/api/user/logout', userController.logout);

// Contacts
userRouter.post('/api/contacts', contactController.create);
userRouter.get('/api/contacts/:contactId', contactController.get);
userRouter.put('/api/contacts/:contactId', contactController.update);
userRouter.delete('/api/contacts/:contactId', contactController.remove);

export { userRouter };
