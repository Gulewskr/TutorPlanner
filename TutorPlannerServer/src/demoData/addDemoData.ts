import { Prisma, Student } from '@prisma/client';
import { contactDataRepository } from '../models/contactData';
import LessonsService from '../services/LessonsService';
import { toMySQLDate } from '../utils/utils';
import { studentRepository } from '../repositories/studentsRepository';

const FIRST_NAMES = [
    'Alan',
    'Kuba',
    'Andrew',
    'John',
    'Joanna',
    'Celine',
    'Zuzia',
    'Ola',
    'Rayan',
];
const LAST_NAMES: string[] = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
];
const CLASS = ['maturalna', '3 liceum', '2 liceum', '1 liceum', '8 klasa'];
const CONTACT_TYPE = ['PHONE', 'EMAIL', 'FACEBOOK', 'DISCORD'];

const getRandomFromList = <T>(list: T[]): T => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
};

const getRandomBoolean = (): boolean => {
    return Math.random() >= 0.5;
};

const getRandomNumberInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomEmail = (firstName: string, lastName: string): string => {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
};

const getRandomPhoneNumber = (): string => {
    const areaCode = getRandomNumberInRange(100, 999); // Random area code
    const prefix = getRandomNumberInRange(100, 999); // Random prefix
    const lineNumber = getRandomNumberInRange(1000, 9999); // Random line number
    return `(${areaCode}) ${prefix}-${lineNumber}`;
};

const getStartAndEndOfWeek = (): { startOfWeek: Date; endOfWeek: Date } => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get current day of the week (0 = Sunday, 6 = Saturday)
    const diffToMonday = (dayOfWeek + 6) % 7; // Calculate difference to Monday

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - diffToMonday); // Set to Monday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday

    return { startOfWeek, endOfWeek };
};

// Function to return a random date in the current week
const getRandomDateInThisWeek = (): Date => {
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();

    const startTime = startOfWeek.getTime();
    const endTime = endOfWeek.getTime();

    const randomTime = Math.random() * (endTime - startTime) + startTime;
    return new Date(randomTime);
};

const getFirstName = (): string => getRandomFromList(FIRST_NAMES);
const getLastName = (): string => getRandomFromList(LAST_NAMES);
const getClass = (): string => getRandomFromList(CLASS);

const getNickname = (f: string, l: string): string =>
    f + l.substring(0, 1).toUpperCase();

const getStudentInput = (): Prisma.StudentCreateInput => ({
    firstname: getFirstName(),
    surename: getLastName(),
    class: getClass(),
    extendedMath: getRandomBoolean(),
    defaultPrice: getRandomNumberInRange(60, 90),
});

const getStudentContacts = (
    student: Student,
): Prisma.ContactDataCreateInput[] => {
    return [
        {
            type: 'PHONE',
            value: getRandomPhoneNumber(),
            student: {
                connect: {
                    id: student.id,
                },
            },
        },
        {
            type: 'EMAIL',
            value: getRandomEmail(student.firstname, student.surename),
            student: {
                connect: {
                    id: student.id,
                },
            },
        },
        {
            type: 'DISCORD',
            value: getNickname(student.firstname, student.surename),
            student: {
                connect: {
                    id: student.id,
                },
            },
        },
        {
            type: 'FACEBOOK',
            value: `${student.firstname}.${student.surename}`,
            student: {
                connect: {
                    id: student.id,
                },
            },
        },
    ];
};

const getStudentLesson = (student: Student) => {
    const startHour = getRandomNumberInRange(8, 20) * 60;
    const newDate = getRandomDateInThisWeek();
    return {
        name: `Korepetycje ${getNickname(student.firstname, student.surename)}`,
        description: '',
        student: student.id,
        price: student.defaultPrice || 0,
        date: newDate,
        date_text: toMySQLDate(newDate),
        startHour: startHour,
        endHour: startHour + 60,
        weekly: true,
    };
};

const addDemoData = async () => {
    console.log('Checking if there is data in database');
    const students = await studentRepository.findAll();
    if (students.length > 0) {
        console.log(
            "There is already existing data in database demo data wont't be added.",
        );
        return;
    }
    console.log('Adding demo data...');
    for (let i = 0; i < 10; i++) {
        const studInput = getStudentInput();
        const student = await studentRepository.create(studInput);
        const contacts = getStudentContacts(student);
        for (const contact of contacts) {
            await contactDataRepository.createContactData(contact);
        }
        await LessonsService.createLesson(getStudentLesson(student));
    }
    console.log('Added demo data to database!');
};

export { addDemoData };
