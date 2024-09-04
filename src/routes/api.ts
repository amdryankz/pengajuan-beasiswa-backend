import * as UserController from "$controllers/UserController";
import * as AuthController from "$controllers/AuthController";
import express from "express";

export const publicRouter = express.Router();

publicRouter.post('/register', UserController.register);
publicRouter.post('/login', AuthController.login);