import * as jwt from 'jsonwebtoken';
import { ENV } from '../config';
import { User } from '../models';

export const auth = (req, res, next) => {
  const token = req.header('Authentication');
  if (!token) return res.status(401).json({ status: 401, msg: 'Auth Error' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), ENV.JWT_ENCRYPTION);
    req.id = decoded.id;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Invalid Token' });
  }
};