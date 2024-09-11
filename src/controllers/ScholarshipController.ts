import { ScholarshipDTO } from "$entities/Scholarship";
import { NextFunction, Request, Response } from "express";
import * as ScholarshipValidation from "$validations/ScholarshipValidation"
import * as ScholarshipService from "$services/ScholarshipService"
import { logger } from "$applications/logging";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const scholarship: ScholarshipDTO = req.body;
        const validation = ScholarshipValidation.validateCreateScholarship(scholarship);
        const fileRequirementIds: string[] = req.body.fileRequirementIds;

        if (validation.length > 0) {
            res.status(400).json({ success: false, errors: validation });
            return;
        }

        const newScholarship = await ScholarshipService.create(scholarship, fileRequirementIds)

        res.status(201).json({ success: true, data: newScholarship, message: 'Succesfully created scholarship!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in creating scholarship', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}