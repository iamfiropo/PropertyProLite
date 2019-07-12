import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const userToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
};

export default { userToken };
