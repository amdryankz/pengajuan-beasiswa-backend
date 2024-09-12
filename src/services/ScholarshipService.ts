import { logger } from "$applications/logging";
import { prisma } from "$applications/prisma";
import { ScholarshipDTO } from "$entities/Scholarship";
import { Scholarships } from "@prisma/client";
import { ulid } from "ulid";

export async function create(data: ScholarshipDTO, fileRequirementIds: string[]): Promise<Scholarships> {
    try {
        const scholarship = await prisma.$transaction(async (prisma) => {
            const newScholarship = await prisma.scholarships.create({
                data: {
                    id: ulid(),
                    name: data.name,
                    donorId: data.donorId,
                    year: data.year,
                    amount: data.amount,
                    amountPeriod: data.amountPeriod,
                    duration: data.duration,
                    startRegistration: data.startRegistration,
                    endRegistration: data.endRegistration,
                    quota: data.quota,
                    startScholarship: data.startScholarship,
                    endScholarship: data.endScholarship
                }
            });

            await Promise.all(fileRequirementIds.map(fileRequirementId =>
                prisma.scholarshipsOnFileRequirements.create({
                    data: {
                        scholarshipId: newScholarship.id,
                        fileRequirementId: fileRequirementId
                    }
                })
            ));

            return newScholarship;
        });

        return scholarship;
    } catch (error) {
        logger.error('Error create scholarship', { error });
        throw error;
    }
}

export async function getAll(): Promise<Scholarships[]> {
    try {
        const scholarship = await prisma.scholarships.findMany({
            include: {
                ScholarshipsOnFileRequirements: {
                    select: {
                        fileRequirementId: true,
                        fileRequirement: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return scholarship;
    } catch (error) {
        logger.error('Error get all scholarships', { error });
        throw error;
    }
}

export async function getById(id: string): Promise<Scholarships> {
    try {
        const scholarship = await prisma.scholarships.findUnique({
            where: {
                id
            },
            include: {
                ScholarshipsOnFileRequirements: {
                    select: {
                        fileRequirementId: true,
                        fileRequirement: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!scholarship) {
            throw new Error("scholarship not found");
        }

        return scholarship;
    } catch (error) {
        logger.error('Error get scholarship by id', { error });
        throw error;
    }
}

export async function update(id: string, data: ScholarshipDTO, fileRequirementIds: string[]): Promise<Scholarships> {
    try {
        let scholarship = await prisma.scholarships.findUnique({
            where: {
                id
            }
        })

        if (!scholarship) {
            throw new Error("scholarship not found");
        }

        scholarship = await prisma.$transaction(async (prisma) => {
            const updateScholarship = await prisma.scholarships.update({
                where: {
                    id
                },
                data: {
                    name: data.name,
                    donorId: data.donorId,
                    year: data.year,
                    amount: data.amount,
                    amountPeriod: data.amountPeriod,
                    duration: data.duration,
                    startRegistration: data.startRegistration,
                    endRegistration: data.endRegistration,
                    quota: data.quota,
                    startScholarship: data.startScholarship,
                    endScholarship: data.endScholarship
                }
            });

            await prisma.scholarshipsOnFileRequirements.deleteMany({
                where: {
                    scholarshipId: id
                }
            });

            await Promise.all(fileRequirementIds.map(fileRequirementId =>
                prisma.scholarshipsOnFileRequirements.create({
                    data: {
                        scholarshipId: id,
                        fileRequirementId: fileRequirementId
                    }
                })
            ));

            return updateScholarship;
        });

        return scholarship;
    } catch (error) {
        logger.error('Error update scholarship', { error });
        throw error;
    }
}

export async function deleteById(id: string): Promise<Scholarships> {
    try {
        let scholarship = await prisma.scholarships.findUnique({
            where: {
                id
            }
        })

        if (!scholarship) {
            throw new Error("scholarship not found");
        }

        scholarship = await prisma.$transaction(async (prisma) => {
            await prisma.scholarshipsOnFileRequirements.deleteMany({
                where: {
                    scholarshipId: id
                }
            });

            const deleteScholarship = await prisma.scholarships.delete({
                where: {
                    id
                }
            });

            return deleteScholarship;
        });

        return scholarship;
    } catch (error) {
        logger.error('Error delete scholarship', { error });
        throw error;
    }
}