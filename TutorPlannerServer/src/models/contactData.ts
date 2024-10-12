import { Prisma, ContactData } from '@prisma/client';
import { prisma } from '../db';

const contactDataRepository = {
    getContactDataByStudentId: async (
        studentId: number,
    ): Promise<ContactData[]> => {
        return await prisma.contactData.findMany({
            where: {
                studentId: studentId,
            },
        });
    },
    createContactData: async (
        contactData: Prisma.ContactDataCreateInput,
    ): Promise<ContactData> => {
        return await prisma.contactData.create({
            data: contactData,
        });
    },
    updateContactData: async (
        id: number,
        contactData: Prisma.ContactDataCreateInput,
    ): Promise<ContactData> => {
        return await prisma.contactData.update({
            data: contactData,
            where: {
                id: id,
            },
        });
    },
    deleteContactData: async (id: number): Promise<ContactData> => {
        return await prisma.contactData.delete({
            where: {
                id: id,
            },
        });
    },
};

export { contactDataRepository, ContactData };
