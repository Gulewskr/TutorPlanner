import { Student } from "@prisma/client";

export type StudentDTO = {
    id: number;
    firstname: string;
    surename: string;
    class: string | null;
    defaultPrice: number | null;
    balance: number;
};

export const studentToStudentDTO = (student: Student): StudentDTO => ({
    id: student.id,
    firstname: student.firstname,
    surename: student.surename,
    class: student.class,
    defaultPrice: student.defaultPrice,
    balance: student.balance
})
