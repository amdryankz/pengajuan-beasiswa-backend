import bcrypt from 'bcrypt';
import { logger } from "$applications/logging";
import { prisma } from "$applications/prisma";
import { exclude, UserJWTDAO, UserLoginDTO } from "$entities/User";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

function createToken(user: User) {
    const jwtPayload = exclude(user, "password") as UserJWTDAO;
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET ?? "", { expiresIn: 7200 });
    return token;
}

interface ServiceResponse<T> {
    data?: T
    err?: ServiceError
    status: boolean
}

interface ServiceError {
    message: string
    code: number
}

export async function login(data: UserLoginDTO): Promise<ServiceResponse<any>> {
    try {
        const { email, password } = data

        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (!user) {
            return {
                status: false,
                data: {},
                err: {
                    message: "User not found",
                    code: 404,
                }
            };
        }

        if (user.status !== 'ACTIVE') {
            return {
                status: false,
                data: {},
                err: {
                    message: 'Account is not active',
                    code: 403,
                }
            };
        }

        const isPasswordVerified = await bcrypt.compare(password, user.password)

        if (isPasswordVerified) {
            const token = createToken(user)
            return {
                status: true,
                data: {
                    user: exclude(user, "password"),
                    token
                }
            }
        } else {
            return {
                status: false,
                data: {},
                err: {
                    message: "Invalid Credential",
                    code: 401,
                }
            }
        }
    } catch (error) {
        logger.error('Error login user', { error });
        throw new Error('Login failed');
    }
}