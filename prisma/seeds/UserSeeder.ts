import { PrismaClient, Roles, Status } from '@prisma/client';
import { ulid } from 'ulid';
import bcrypt from 'bcrypt';

export async function UserSeeder(prisma: PrismaClient) {
    const countAdmin = await prisma.user.count({
        where: {
            role: "ADMIN",
        }
    })

    const countUser = await prisma.user.count({
        where: {
            role: "USER",
        }
    })

    if (countAdmin === 0) {
        const hashedPassword = await bcrypt.hash("admin123", 12)

        await prisma.user.create({
            data: {
                id: ulid(),
                email: "admin@example.com",
                password: hashedPassword,
                name: "admin",
                gender: "male",
                phone_number: "08122345532",
                birthdate: "2002-10-11",
                birthplace: "Jakarta",
                address: "Jakarta Utara",
                status: Status.ACTIVE,
                role: Roles.ADMIN
            },
        })
    }

    if (countUser === 0) {
        const hashedPassword = await bcrypt.hash("user123", 12)

        await prisma.user.create({
            data: {
                id: ulid(),
                email: "user@example.com",
                password: hashedPassword,
                name: "user",
                gender: "male",
                phone_number: "08122345532",
                birthdate: "2003-10-11",
                birthplace: "Jakarta",
                address: "Jakarta Selatan",
                status: Status.ACTIVE,
                role: Roles.USER
            }
        })
    }
}