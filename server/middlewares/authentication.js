import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import Response from '../utils/helpers/response';
import Check from '../utils/helpers/check';

config();

const userToken = async (req, res, next) => {
  try {
    const token = await Check.checkToken(req);
    if (!token) return Response.handleError(403, 'Token required. Please sign in or register as a user', res);
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return Response.handleError(401, error.message, res);
      res.locals.user = user;
      next();
    });
  } catch (error) {
    return Response.handleError(500, error.message, res);
  }
};

export default { userToken };
