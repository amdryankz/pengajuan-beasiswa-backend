import { passStatus } from "@prisma/client";

export interface UserScholarshipDTO {
    id: string;
    userId: string;
    scholarshipId: string;
    fileStatus?: passStatus;
    scholarshipStatus?: passStatus;
}

export interface UserUploadedFileDTO {
    id: string;
    userScholarshipId: string;
    fileRequirementId: string;
    fileUrl: string;
}