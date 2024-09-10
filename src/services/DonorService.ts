import { logger } from "$applications/logging";
import { prisma } from "$applications/prisma";
import { DonorDTO } from "$entities/Donor";
import { Donors } from "@prisma/client";
import { ulid } from "ulid";

export async function create(data: DonorDTO): Promise<Donors> {
    try {
        const donor = await prisma.donors.create({
            data: {
                id: ulid(),
                name: data.name
            }
        });

        return donor;
    } catch (error) {
        logger.error('Error creating donor', { error });
        throw error;
    }
}

export async function getAll(): Promise<Donors[]> {
    try {
        const donor = await prisma.donors.findMany();

        return donor;
    } catch (error) {
        logger.error('Error get all donor', { error });
        throw error;
    }
}

export async function update(id: string, data: DonorDTO): Promise<Donors> {
    try {
        let donor = await prisma.donors.findUnique({
            where: {
                id
            }
        })

        if (!donor) {
            throw new Error("Donor not found");
        }

        donor = await prisma.donors.update({
            where: {
                id
            },
            data: {
                name: data.name,
            }
        })

        return donor;
    } catch (error) {
        logger.error('Error update donor', { error });
        throw error;
    }
}

export async function deleteById(id: string): Promise<Donors> {
    try {
        let donor = await prisma.donors.findUnique({
            where: {
                id
            }
        })

        if (!donor) {
            throw new Error("Donor not found");
        }

        donor = await prisma.donors.delete({
            where: {
                id
            }
        })

        return donor;
    } catch (error) {
        logger.error('Error delete donor', { error });
        throw error;
    }
}