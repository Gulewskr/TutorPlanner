import { Request } from 'express';
import { parseNumber } from '../utils/utils';

export const getStudentIdFromParams = (req: Request): number => parseNumber(req.params.studentId);
