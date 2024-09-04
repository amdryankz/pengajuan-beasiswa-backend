import { UserCreateDTO } from "$entities/User";
import * as UserService from "$services/UserService"
import * as UserValidation from "$validations/UserValidation"
import { logger } from "applications/logging";
import { Request, Response } from "express";

export async function register(req: Request, res: Response): Promise<void> {
    try {
        const userData: UserCreateDTO = req.body;
        const validationErrors = UserValidation.validateCreateUser(userData);

        if (validationErrors.length > 0) {
            res.status(400).json({ success: false, errors: validationErrors });
            return;
        }

        const newUser = await UserService.create(userData);

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in register user', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}
