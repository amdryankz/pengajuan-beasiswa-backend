import { UserScholarshipDTO, UserUploadedFileDTO } from "$entities/UserScholarship";

export function validateUserScholarship(data: UserScholarshipDTO, files: UserUploadedFileDTO[]): string[] {
    const errors: string[] = [];

    if (!data.scholarshipId || data.scholarshipId.trim() === '') {
        errors.push('scholarshipId is required');
    }

    if (!data.userId || data.userId.trim() === '') {
        errors.push('userId is required');
    }

    if (!Array.isArray(files) || files.length === 0) {
        errors.push('Uploaded file is required.');
        return errors;
    }

    files.forEach((file, index) => {
        if (!file.fileRequirementId || file.fileRequirementId.trim() === '') {
            errors.push(`File Requirement ID is required for file at index ${index}.`);
        }

        if (!file.fileUrl || file.fileUrl.trim() === '') {
            errors.push(`File URL is required for file at index ${index}.`);
        }
    });

    return errors;
}