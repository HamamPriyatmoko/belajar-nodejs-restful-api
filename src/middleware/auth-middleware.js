import { prismaClient } from '../application/database.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.session_token;
  console.log(token);
  if (!token) {
    res.status(401).json({ errors: Unauthorized }).end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!user) {
      res.status(401).json({ errors: 'Unauthorized' }).end();
    } else {
      req.user = user;
      next();
    }
  }
};
