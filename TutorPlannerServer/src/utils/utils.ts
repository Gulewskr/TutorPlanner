import {
    endOfQuarter,
    format,
    isValid,
    parse,
    setQuarter,
    setYear,
    startOfQuarter,
} from 'date-fns';
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

export const parseNumber = (reqParam: string): number => {
    const param = Number(reqParam);
    if (Number.isNaN(param)) {
        throw new Error('Wrong data format provided.');
    }
    return param;
};

export const parseDate = (dateString: string): Date => {
    const date = new Date(dateString);
    if (!isValid(date)) {
        throw new Error(
            'Invalid date format. Please use a valid date (YYYY-MM-DD).',
        );
    }
    return getDateWithoutTZ(date);
};

export const parseReqestQueryToOptionalDate = (
    dateString?: string,
): Date | undefined => {
    if (!dateString) {
        return undefined;
    }
    return parseDate(dateString);
};

export const getDateWithoutTZ = (date: Date): Date =>
    new Date(date.valueOf() - date.getTimezoneOffset() * 60 * 1000);

export const toMySQLDate = (date: string | Date): string =>
    format(date, 'yyyy-MM-dd');

export const getQuarterRange = (
    quarter: number,
    year: number,
): { from: Date; to: Date } => {
    if (quarter < 1 || quarter > 4) {
        throw new Error('Quarter must be between 1 and 4');
    }

    const base = setQuarter(setYear(new Date(), year), quarter);

    return {
        from: startOfQuarter(base),
        to: endOfQuarter(base),
    };
};
