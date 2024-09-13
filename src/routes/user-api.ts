import express from 'express';
import { authenticateJWT } from 'middlewares/AuthMiddleware';
import * as UserScholarshipController from "$controllers/UserScholarshipController"

export const userRouter = express.Router();
userRouter.use(authenticateJWT);

userRouter.post('/user-scholarship/registration', UserScholarshipController.create);
