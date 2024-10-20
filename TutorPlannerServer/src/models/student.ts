import { Prisma, Student } from '@prisma/client';
import { prisma } from '../db';

const studentRepository = {
    findStudentById: async (studentId: number): Promise<Student | null> => {
        return await prisma.student.findFirst({
            where: {
                id: studentId,
            },
        });
    },
    count: async (): Promise<number> => {
        return await prisma.student.count({
            where: {
                isActive: true,
            },
        });
    },
    findAll: async (): Promise<Student[]> => {
        return await prisma.student.findMany({
            where: {
                isActive: true,
            },
        });
    },
    create: async (student: Prisma.StudentCreateInput): Promise<Student> => {
        const createdStudent = await prisma.student.create({
            data: student,
        });
        return createdStudent;
    },
    update: async (
        studentId: number,
        student: Prisma.StudentUpdateInput,
    ): Promise<Student> => {
        const res = await prisma.student.update({
            data: student,
            where: {
                id: studentId,
            },
        });
        return res;
    },
    disable: async (studentId: number): Promise<Student> => {
        return await prisma.student.update({
            data: {
                isActive: false,
            },
            where: {
                id: studentId,
            },
        });
    },
    delete: async (studentId: number): Promise<Student> => {
        return await prisma.student.delete({
            where: {
                id: studentId,
            },
        });
    },
};

export { studentRepository, Student };
