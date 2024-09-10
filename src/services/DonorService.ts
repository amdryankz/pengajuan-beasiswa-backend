import { logger } from "$applications/logging";
import { prisma } from "$applications/prisma";
import { DonorDTO } from "$entities/Donor";
import { ServiceResponse } from "$entities/Service";
import { Donors } from "@prisma/client";
import { ulid } from "ulid";

export async function create(data: DonorDTO): Promise<ServiceResponse<Donors | {}>> {
    try {
        const donor = await prisma.donors.create({
            data: {
                id: ulid(),
                name: data.name
            }
        });

        return {
            status: true,
            data: donor
        }
    } catch (error) {
        logger.error('Error creating donor', { error });
        throw error;
    }
}

export async function getAll(): Promise<ServiceResponse<Donors | {}>> {
    try {
        const donor = await prisma.donors.findMany();

        return {
            status: true,
            data: donor
        }
    } catch (error) {
        logger.error('Error get all donor', { error });
        throw error;
    }
}

export async function update(id: string, data: DonorDTO): Promise<ServiceResponse<Donors | {}>> {
    try {
        let donor = await prisma.donors.findUnique({
            where: {
                id
            }
        })

        if (!donor) {
            return {
                status: false,
                data: {},
                err: {
                    message: "Donor not found",
                    code: 404,
                }
            };
        }

        donor = await prisma.donors.update({
            where: {
                id
            },
            data: {
                name: data.name,
            }
        })

        return {
            status: true,
            data: donor
        }
    } catch (error) {
        logger.error('Error update donor', { error });
        throw error;
    }
}

export async function deleteById(id: string): Promise<ServiceResponse<Donors | {}>> {
    try {
        let donor = await prisma.donors.findUnique({
            where: {
                id
            }
        })

        if (!donor) {
            return {
                status: false,
                data: {},
                err: {
                    message: "Donor not found",
                    code: 404,
                }
            };
        }

        donor = await prisma.donors.delete({
            where: {
                id
            }
        })

        return {
            status: true,
            data: donor
        }
    } catch (error) {
        logger.error('Error delete donor', { error });
        throw error;
    }
}