import { StudentDTO } from '@model';

export const getFullName = (student?: StudentDTO): string =>
    student ? `${student.firstname} ${student.surename}` : '-';
