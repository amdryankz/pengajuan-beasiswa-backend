import { UserScholarshipDTO, UserUploadedFileDTO } from "$entities/UserScholarship";
import { NextFunction, Request, Response } from "express";
import * as UserScholarshipValidation from "$validations/UserScholarshipValidation"
import * as UserScholarshipService from "$services/UserScholarshipService";
import { logger } from "$applications/logging";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const userScholarship: UserScholarshipDTO = req.body;
        const files: UserUploadedFileDTO[] = req.body.files;
        const validation = UserScholarshipValidation.validateUserScholarship(userScholarship, files);

        if (validation.length > 0) {
            res.status(400).json({ success: false, errors: validation });
            return;
        }

        const newUserScholarship = await UserScholarshipService.create(userScholarship, files);

        res.status(201).json({ success: true, data: newUserScholarship, message: 'Successfully created userScholarship!' });
    } catch (error) {
        logger.error('Error in creating userScholarship', { error });
        res.status(400).json({ success: false, message: error });
    }
}

export async function getAll(req: Request, res: Response): Promise<void> {
    try {
        const userScholarship = await UserScholarshipService.getAll();

        res.status(201).json({ success: true, data: userScholarship, message: 'Succesfully get all userScholarship!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error get all userScholarship', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function getById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const scholarship = await UserScholarshipService.getById(id);

        res.status(201).json({ success: true, data: scholarship, message: 'Succesfully get userScholarship by id!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error get userScholarship by id', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}