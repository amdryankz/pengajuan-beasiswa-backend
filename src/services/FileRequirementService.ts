import { FileRequirementDTO } from './../entities/FileRequirements';
import { logger } from "$applications/logging";
import { prisma } from "$applications/prisma";
import { FileRequirements } from "@prisma/client";
import { ulid } from "ulid";

export async function create(data: FileRequirementDTO): Promise<FileRequirements> {
    try {
        const fileRequirement = await prisma.fileRequirements.create({
            data: {
                id: ulid(),
                name: data.name
            }
        });

        return fileRequirement;
    } catch (error) {
        logger.error('Error creating file requirement', { error });
        throw error;
    }
}

export async function getAll(): Promise<FileRequirements[]> {
    try {
        const fileRequirement = await prisma.fileRequirements.findMany();

        return fileRequirement;
    } catch (error) {
        logger.error('Error get all file requirement', { error });
        throw error;
    }
}

export async function update(id: string, data: FileRequirementDTO): Promise<FileRequirements> {
    try {
        let fileRequirement = await prisma.fileRequirements.findUnique({
            where: {
                id
            }
        })

        if (!fileRequirement) {
            throw new Error("file requirement not found");
        }

        fileRequirement = await prisma.fileRequirements.update({
            where: {
                id
            },
            data: {
                name: data.name,
            }
        })

        return fileRequirement;
    } catch (error) {
        logger.error('Error update file requirement', { error });
        throw error;
    }
}

export async function deleteById(id: string): Promise<FileRequirements> {
    try {
        let fileRequirement = await prisma.fileRequirements.findUnique({
            where: {
                id
            }
        })

        if (!fileRequirement) {
            throw new Error("file requirement not found");
        }

        fileRequirement = await prisma.fileRequirements.delete({
            where: {
                id
            }
        })

        return fileRequirement;
    } catch (error) {
        logger.error('Error delete file requirement', { error });
        throw error;
    }
}