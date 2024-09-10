import { DonorDTO } from "$entities/Donor";

export function validateCreateDonor(data: DonorDTO): string[] {
    const errors: string[] = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }

    return errors;
}