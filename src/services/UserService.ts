import { UserCreateDTO } from "$entities/User";
import { prisma } from "applications/prisma";
import { Status, User } from "@prisma/client";
import { ulid } from "ulid";
import bcrypt from "bcrypt"
import { logger } from "applications/logging";
import { DateTime } from "luxon";

export async function create(data: UserCreateDTO): Promise<User> {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 12)
        const formattedBirthdate = DateTime.fromISO(data.birthdate).toISODate();

        const newUser = await prisma.user.create({
            data: {
                id: ulid(),
                name: data.name,
                email: data.email,
                password: hashedPassword,
                gender: data.gender,
                phone_number: data.phone_number,
                birthdate: formattedBirthdate!,
                birthplace: data.birthplace,
                address: data.address,
                status: Status.ACTIVE,
                role: data.role,
            }
        })

        return newUser;
    } catch (error) {
        logger.error('Error creating user', { error });
        throw error;
    }
}
