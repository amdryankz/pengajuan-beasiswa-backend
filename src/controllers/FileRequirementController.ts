import { FileRequirementDTO } from './../entities/FileRequirements';
import { Request, Response } from "express";
import * as FileRequirementValidation from "$validations/FileRequirementValidation"
import * as FileRequirementService from "$services/FileRequirementService";
import { logger } from "$applications/logging";

export async function create(req: Request, res: Response): Promise<void> {
    try {
        const fileRequirement: FileRequirementDTO = req.body;
        const validation = FileRequirementValidation.validateCreateFileRequirement(fileRequirement);

        if (validation.length > 0) {
            res.status(400).json({ success: false, errors: validation });
            return;
        }

        const newFileRequirement = await FileRequirementService.create(fileRequirement);

        res.status(201).json({ success: true, data: newFileRequirement, message: 'Succesfully created fileRequirement!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in creating fileRequirement', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function getAll(req: Request, res: Response): Promise<void> {
    try {
        const fileRequirement = await FileRequirementService.getAll();

        res.status(201).json({ success: true, data: fileRequirement, message: 'Succesfully get all fileRequirement!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error get all fileRequirement', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    try {
        const fileRequirement: FileRequirementDTO = req.body;
        const id = req.params.id;
        const validation = FileRequirementValidation.validateCreateFileRequirement(fileRequirement);

        if (validation.length > 0) {
            res.status(400).json({ success: false, errors: validation });
            return;
        }

        const updateFileRequirement = await FileRequirementService.update(id, fileRequirement);

        res.status(201).json({ success: true, data: updateFileRequirement, message: 'Succesfully updated fileRequirement!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in updating fileRequirement', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;

        const fileRequirement = await FileRequirementService.deleteById(id);

        res.status(201).json({ success: true, data: fileRequirement, message: 'Succesfully deleted fileRequirement!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in delete fileRequirement', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}