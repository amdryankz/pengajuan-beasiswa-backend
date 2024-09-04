import { UserLoginDTO } from "$entities/User";

export function validateAuthUser(data: UserLoginDTO): string[] {
    const errors: string[] = [];

    if (!data.email || data.email.trim() === '') {
        errors.push('Email is required');
    }

    if (!data.password || data.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    return errors;
}