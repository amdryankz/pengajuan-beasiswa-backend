import { FileRequirementDTO } from './../entities/FileRequirements';
import { logger } from "$applications/logging";
import { prisma } from "$applications/prisma";
import { ServiceResponse } from "$entities/Service";
import { FileRequirements } from "@prisma/client";
import { ulid } from "ulid";

export async function create(data: FileRequirementDTO): Promise<ServiceResponse<FileRequirements | {}>> {
    try {
        const fileRequirement = await prisma.fileRequirements.create({
            data: {
                id: ulid(),
                name: data.name
            }
        });

        return {
            status: true,
            data: fileRequirement
        }
    } catch (error) {
        logger.error('Error creating file requirement', { error });
        throw error;
    }
}

export async function getAll(): Promise<ServiceResponse<FileRequirements | {}>> {
    try {
        const fileRequirement = await prisma.fileRequirements.findMany();

        return {
            status: true,
            data: fileRequirement
        }
    } catch (error) {
        logger.error('Error get all file requirement', { error });
        throw error;
    }
}

export async function update(id: string, data: FileRequirementDTO): Promise<ServiceResponse<FileRequirements | {}>> {
    try {
        let fileRequirement = await prisma.fileRequirements.findUnique({
            where: {
                id
            }
        })

        if (!fileRequirement) {
            return {
                status: false,
                data: {},
                err: {
                    message: "file requirement not found",
                    code: 404,
                }
            };
        }

        fileRequirement = await prisma.fileRequirements.update({
            where: {
                id
            },
            data: {
                name: data.name,
            }
        })

        return {
            status: true,
            data: fileRequirement
        }
    } catch (error) {
        logger.error('Error update file requirement', { error });
        throw error;
    }
}

export async function deleteById(id: string): Promise<ServiceResponse<FileRequirements | {}>> {
    try {
        let fileRequirement = await prisma.fileRequirements.findUnique({
            where: {
                id
            }
        })

        if (!fileRequirement) {
            return {
                status: false,
                data: {},
                err: {
                    message: "file requirement not found",
                    code: 404,
                }
            };
        }

        fileRequirement = await prisma.fileRequirements.delete({
            where: {
                id
            }
        })

        return {
            status: true,
            data: fileRequirement
        }
    } catch (error) {
        logger.error('Error delete file requirement', { error });
        throw error;
    }
}