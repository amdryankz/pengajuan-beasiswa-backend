import { FileRequirementDTO } from "$entities/FileRequirements";

export function validateCreateFileRequirement(data: FileRequirementDTO): string[] {
    const errors: string[] = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }

    return errors;
}