import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { InvalidFormatError } from '../models/errors/invalid_format.error';
import { GeneralError } from '../models/errors/general.error';
import { ErrorCode } from '../models/errors/errorsCodes';
import { Prisma } from '@prisma/client';

export const errorHandler = (
    err: Error | any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err instanceof ZodError) {
        const error: InvalidFormatError = {
            message: 'invalid data format',
            code: ErrorCode.VALIDATION_FAILED,
            errors:  err.issues.map(issue => ({
                path: issue.path.join("."),
                message: issue.message,
                code: issue.code,
            }))
        }
        res.status(400);
        res.json(error);
        res.end();
        return;
    }


    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(500);
        res.end();
        return;
    }


    if (err instanceof Prisma.PrismaClientValidationError) {
        console.log(JSON.stringify(err.message));
        
        const error: InvalidFormatError = {
            message: 'invalid request data',
            code: ErrorCode.VALIDATION_FAILED,
            errors: []
        }
        res.status(400);
        res.json(error);
        res.end();
        return;
    }

    console.log(JSON.stringify(err));

    const error: GeneralError = {
        message: err.message,
        code: ErrorCode.UNEXPECTED_ERROR
    }

    res.status(err.status || 500);
    res.json(error);
    res.end();
    return;
};
