import { isValid, parse } from 'date-fns';
import { Request } from 'express';

export const validateDateFormat = (dateString?: string): Date => {
    if (dateString == undefined) {
        throw new Error('Missing date');
    }
    if (isValid(parse(dateString, 'yyyy-MM-dd', new Date()))) {
        const dt = parse(
            dateString,
            'yyyy-MM-dd',
            new Date().setHours(0, 0, 0, 0),
        );
        return new Date(dt.valueOf() + dt.getTimezoneOffset() * -60 * 1000);
    }
    throw new Error('Invalid date format');
};

export const parsePaginationParams = (req: Request) => {
    const { page, size } = req.query;
    return {
        page: page ? parseInt(page as string) : undefined,
        pageSize: size ? parseInt(size as string) : undefined,
    };
};
