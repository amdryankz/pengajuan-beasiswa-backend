import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { UserJWTDAO } from '$entities/User';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const JWT_SECRET = process.env.JWT_SECRET || '';
        const decoded = jwt.verify(token, JWT_SECRET) as UserJWTDAO;
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}