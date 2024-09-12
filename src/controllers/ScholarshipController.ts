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

export async function getAll(req: Request, res: Response): Promise<void> {
    try {
        const scholarship = await ScholarshipService.getAll();

        res.status(201).json({ success: true, data: scholarship, message: 'Succesfully get all scholarship!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error get all scholarship', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function getById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const scholarship = await ScholarshipService.getById(id);

        res.status(201).json({ success: true, data: scholarship, message: 'Succesfully get scholarship by id!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error get scholarship by id', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    try {
        const scholarship: ScholarshipDTO = req.body;
        const id = req.params.id;
        const validation = ScholarshipValidation.validateCreateScholarship(scholarship);
        const fileRequirementIds: string[] = req.body.fileRequirementIds;

        if (validation.length > 0) {
            res.status(400).json({ success: false, errors: validation });
            return;
        }

        const updateScholarship = await ScholarshipService.update(id, scholarship, fileRequirementIds);

        res.status(201).json({ success: true, data: updateScholarship, message: 'Succesfully updated scholarship!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in updating scholarship', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;

        const scholarship = await ScholarshipService.deleteById(id);

        res.status(201).json({ success: true, data: scholarship, message: 'Succesfully deleted scholarship!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in delete scholarship', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}