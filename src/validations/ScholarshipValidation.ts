import { ScholarshipDTO } from "$entities/Scholarship";

export function validateCreateScholarship(data: ScholarshipDTO): string[] {
    const errors: string[] = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }

    if (!data.donorId || data.donorId.trim() === '') {
        errors.push('Donor ID is required');
    }

    if (!data.year || isNaN(Number(data.year)) || Number(data.year) < new Date().getFullYear()) {
        errors.push('Valid year is required');
    }

    if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
        errors.push('Valid amount is required');
    }

    if (!data.amountPeriod || !['YEAR', 'MONTH'].includes(data.amountPeriod)) {
        errors.push('Amount period must be either "YEAR" or "MONTH"');
    }

    if (!data.duration || isNaN(Number(data.duration)) || Number(data.duration) <= 0) {
        errors.push('Valid duration is required');
    }

    if (!data.startRegistration) {
        errors.push('Start registration date is required');
    } else if (!data.endRegistration) {
        errors.push('End registration date is required');
    } else if (data.startRegistration >= data.endRegistration) {
        errors.push('End registration date must be after start registration date');
    }

    if (!data.startScholarship) {
        errors.push('Start scholarship date is required');
    } else if (!data.endScholarship) {
        errors.push('End scholarship date is required');
    } else if (data.startScholarship >= data.endScholarship) {
        errors.push('End scholarship date must be after start scholarship date');
    }

    if (!data.quota || isNaN(Number(data.quota)) || Number(data.quota) <= 0) {
        errors.push('Valid quota is required');
    }

    return errors;
}
