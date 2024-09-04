import { Roles, Status } from "@prisma/client";

export interface UserJWTDAO {
    id: string;
    email: string;
    name: string;
    role: Roles;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface UserCreateDTO {
    id: string
    name: string;
    email: string;
    password: string;
    gender: string;
    phone_number: string;
    birthdate: string;
    birthplace: string;
    address: string;
    role: Roles;
    status?: Status;
}

export interface UserDTO {
    id: string;
    name: string;
    email: string;
}

export function exclude<User, Key extends keyof User>(user: User, ...keys: Key[]): Omit<User, Key> {
    for (let key of keys) {
        delete user[key]
    }
    return user
}