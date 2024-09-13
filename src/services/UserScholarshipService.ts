import { UserScholarships } from '@prisma/client';
import { UserScholarshipDTO, UserUploadedFileDTO } from './../entities/UserScholarship';
import { logger } from '$applications/logging';
import { prisma } from '$applications/prisma';
import { ulid } from 'ulid';

export async function create(data: UserScholarshipDTO, files: UserUploadedFileDTO[]): Promise<any> {
    try {
        const userScholarship = await prisma.$transaction(async (prisma) => {
            const newUserScholarship = await prisma.userScholarships.create({
                data: {
                    id: ulid(),
                    userId: data.userId,
                    scholarshipId: data.scholarshipId
                }
            });

            const uploadedFile = await Promise.all(files.map(file =>
                prisma.userUploadedFiles.create({
                    data: {
                        id: ulid(),
                        userScholarshipId: newUserScholarship.id,
                        fileRequirementId: file.fileRequirementId,
                        fileUrl: file.fileUrl
                    }
                })
            ));

            return { newUserScholarship, uploadedFile };
        })

        return userScholarship;
    } catch (error) {
        logger.error('Error create UserScholarship', { error });
        throw error;
    }
}

export async function getAll(): Promise<UserScholarships[]> {
    try {
        const userScholarship = await prisma.userScholarships.findMany({
            include: {
                UserUploadedFiles: true
            }
        });

        return userScholarship;
    } catch (error) {
        logger.error('Error getAll UserScholarship', { error });
        throw error;
    }
}

export async function getById(id: string): Promise<UserScholarships> {
    try {
        let userScholarship = await prisma.userScholarships.findUnique({
            where: {
                id
            },
            include: {
                UserUploadedFiles: true
            }
        });

        if (!userScholarship) {
            throw new Error('userScholarship not found');
        }

        return userScholarship;
    } catch (error) {
        logger.error('Error get scholarship by id', { error });
        throw error;
    }
}

// export async function update(id: string, data: UserScholarshipDTO, files: UserUploadedFileDTO): Promise<any> {
//     try {
//         let userScholarship = await prisma.userScholarships.findUnique({
//             where: {
//                 id
//             }
//         });

//         if (!userScholarship) {
//             throw new Error('userScholarship not found');
//         }

//         userScholarship = await prisma.$transaction(async (prisma) => {
//             const updateUserScholarship = prisma.userScholarships.update({
//                 where:{
//                     id
//                 },
//                 data:{

//                 }
//             })
//         })
//     } catch (error) {
//         logger.error('Error update userScholarship', { error });
//         throw error;
//     }
// }