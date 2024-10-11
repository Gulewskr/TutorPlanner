import { Request, Response } from 'express';

export const parseStudentId = (req: Request): number => {
    const studentId = Number(req.params.studentId);
    if (Number.isNaN(studentId)) {
        throw new Error('Invalid input. Wrong studentId provided.');
    }
    return studentId;
};

export const uncheckedParseStudentId = (req: Request): number | undefined => {
    const studentId = Number(req.params.studentId);
    if (Number.isNaN(studentId)) {
        return undefined;
    }
    return studentId;
};
