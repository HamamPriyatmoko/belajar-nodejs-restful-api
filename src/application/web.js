import express from 'express';
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { userRouter } from '../route/api.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const web = express();
web.use(cors(corsOptions));
web.use(cookieParser());
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

export { web };
