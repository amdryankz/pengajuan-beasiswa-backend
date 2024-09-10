import { DonorDTO } from "$entities/Donor";
import { Request, Response } from "express";
import * as DonorValidation from "$validations/DonorValidation"
import * as DonorService from "$services/DonorService";
import { logger } from "$applications/logging";

export async function create(req: Request, res: Response): Promise<void> {
    try {
        const donor: DonorDTO = req.body;
        const validation = DonorValidation.validateCreateDonor(donor);

        if (validation.length > 0) {
            res.status(400).json({ success: false, errors: validation });
            return;
        }

        const newDonor = await DonorService.create(donor);

        res.status(201).json({ success: true, data: newDonor, message: 'Succesfully created donor!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in creating donor', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function getAll(req: Request, res: Response): Promise<void> {
    try {
        const donor = await DonorService.getAll();

        res.status(201).json({ success: true, data: donor, message: 'Succesfully get all donor!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error get all donor', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    try {
        const donor: DonorDTO = req.body;
        const id = req.params.id;
        const validation = DonorValidation.validateCreateDonor(donor);

        if (validation.length > 0) {
            res.status(400).json({ success: false, errors: validation });
            return;
        }

        const updateDonor = await DonorService.update(id, donor);

        res.status(201).json({ success: true, data: updateDonor, message: 'Succesfully updated donor!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in updating donor', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;

        const donor = await DonorService.deleteById(id);

        res.status(201).json({ success: true, data: donor, message: 'Succesfully deleted donor!' });
    } catch (error) {
        const err = error as Error;
        logger.error('Error in delete donor', { error: err });

        res.status(400).json({ success: false, message: err.message });
    }
}