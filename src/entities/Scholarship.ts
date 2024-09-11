import { AmountPeriod } from "@prisma/client";

export interface ScholarshipDTO {
    id: string;
    name: string;
    donorId: string;
    year: string;
    amount: string;
    amountPeriod: AmountPeriod;
    duration: string;
    startRegistration: string;
    endRegistration: string;
    quota: string;
    startScholarship: string;
    endScholarship: string;
}