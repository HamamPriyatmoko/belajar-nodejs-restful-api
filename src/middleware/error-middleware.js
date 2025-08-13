import { ResponseError } from '../error/response-error.js';

const errorMiddleware = (err, req, res, next) => {
  console.log('Ini adalah error status', err.status);
  if (!err) {
    next();
    return;
  }
  if (err instanceof ResponseError) {
    res.status(err.status).json({ errors: err.message }).end();
  } else {
    res.status(500).json({ errors: err.message });
  }
};

export { errorMiddleware };
