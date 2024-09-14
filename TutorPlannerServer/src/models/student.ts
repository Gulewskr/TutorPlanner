import { PrismaClient, Prisma, Student } from '@prisma/client';

const prisma = new PrismaClient();

const studentRepository = {
    getStudentById: async (studentId: number): Promise<Student | null> => {
        return await prisma.student.findFirst({
            where: {
                id: studentId,
            },
        });
    },
    getAllStudents: async (): Promise<Student[]> => {
        return await prisma.student.findMany();
    },
    createStudent: async (
        student: Prisma.StudentCreateInput,
    ): Promise<Student> => {
        const createdStudent = await prisma.student.create({
            data: student,
        });
        console.log('CREATED!');
        return createdStudent;
    },
    updateStudent: async (
        studentId: number,
        student: Prisma.StudentCreateInput,
    ): Promise<Student> => {
        return await prisma.student.update({
            data: student,
            where: {
                id: studentId,
            },
        });
    },
    deleteStudent: async (studentId: number): Promise<Student> => {
        return await prisma.student.delete({
            where: {
                id: studentId,
            },
        });
    },
};

export { studentRepository, Student };
