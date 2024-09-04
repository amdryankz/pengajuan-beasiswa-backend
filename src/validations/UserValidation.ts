import { UserCreateDTO } from "$entities/User";

export function validateCreateUser(data: UserCreateDTO): string[] {
    const errors: string[] = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }

    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.push('A valid email is required');
    }

    if (!data.password || data.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (!data.gender || (data.gender !== 'male' && data.gender !== 'female')) {
        errors.push('Gender must be either "male" or "female"');
    }

    if (!data.phone_number || !/^\+?[0-9]{10,15}$/.test(data.phone_number)) {
        errors.push('A valid phone number is required');
    }

    if (!data.birthdate || isNaN(Date.parse(data.birthdate.toString()))) {
        errors.push('A valid birthdate is required');
    }

    if (!data.birthplace || data.birthplace.trim() === '') {
        errors.push('Birthplace is required');
    }

    if (!data.address || data.address.trim() === '') {
        errors.push('Address is required');
    }

    if (!data.role || data.role.trim() === '') {
        errors.push('Role is required');
    }

    return errors;
}