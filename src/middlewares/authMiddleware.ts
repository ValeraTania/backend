import { Request, Response, NextFunction } from 'express';
import tokenService from '../utils/tokenService.js';
import { error } from 'console';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const splitedToken = token.split(' ')[1];
  const decodedPayload = tokenService.validateAccessToken(splitedToken);
  console.log(decodedPayload);

  if (!decodedPayload) {
    res.status(401).json({ error: 'Invalid bearer token' });
  }
  next();
}
