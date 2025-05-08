import { Request, Response, NextFunction } from 'express';
import tokenService from '../utils/tokenService.js';

export default function authMiddleware(roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const splitedToken = token.split(' ')[1];

    if (splitedToken) {
      // {name: '', username: '', role: 'ADMIN'}
      const decodedPayload = tokenService.validateAccessToken(splitedToken);

      if (!decodedPayload) {
        res.status(401).json({ error: 'Invalid Bearer token' });
        return;
      }

      if (!roles.includes(decodedPayload.role)) {
        res.status(403).json({ error: "Access forbiden. User doesn't have the required role" });
        return;
      }

      next();
    }

    res.status(401).json({ error: 'Invalid Bearer token' });
    return;
  };
}
