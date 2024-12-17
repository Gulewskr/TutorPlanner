import { StudentDTO } from '@model';

export const getFullName = (student?: StudentDTO): string =>
    student ? `${student.firstname} ${student.surename}` : '-';

export const shortTextToLength = (text: string, length: number): string => {
    if (text.length < length) {
        return text;
    }
    return `${text.substring(0, length - 3)}...`;
};
