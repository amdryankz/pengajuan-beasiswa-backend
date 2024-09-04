import { UserLoginDTO } from "$entities/User";
import * as AuthService from "$services/AuthService"
import * as AuthValidation from "$validations/AuthValidation"
import { logger } from "applications/logging";
import { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const user: UserLoginDTO = req.body;
        const validationErrors = AuthValidation.validateAuthUser(user);

        if (validationErrors.length > 0) {
            res.status(400).json({ success: false, errors: validationErrors });
            return;
        }

        const newUser = await AuthService.login(user);

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in login user', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}
