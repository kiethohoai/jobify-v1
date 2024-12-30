import { UnAuthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  // check headers
  const authHeaader = req.headers.authorization;

  if (!authHeaader || !authHeaader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }

  const token = authHeaader.split(' ').at(1);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
