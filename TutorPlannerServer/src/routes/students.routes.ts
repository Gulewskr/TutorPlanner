import express, { NextFunction, Router } from 'express';
import StudentService from '../services/StudentService';
import paymentRouter from './studentsRoutes/payments.routes';
import lessonsRouter from './studentsRoutes/lessons.routes';
import { StudentsDTO } from '../dto/students';
import StudentPaymentsService from '../services/StudentPaymentsService';
import { parseStudentId } from './studentsRoutes/utils';
import { errorHandler } from '../middlewares/errorHandler';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    const data: StudentsDTO = await StudentService.getStudents();
    res.status(200).json(data);
});

router.post('/', async (req, res, next) => {
    try {
        const createdStudent = await StudentService.createStudent(req.body);
        res.status(200).json(createdStudent);
    } catch (err) {
        next(err);
    }
});

router.get('/:studentId', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const student = await StudentService.getStudent(studentId);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.post('/:studentId', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const student = await StudentService.updateStudent(studentId, req.body);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.delete('/:studentId', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const student = await StudentService.disableStudent(studentId);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.post('/:studentId/recalculate', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const student =
            await StudentPaymentsService.recalculateStudentBalance(studentId);
        return res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.use('/:studentId/payments', paymentRouter);
router.use('/:studentId/lessons', lessonsRouter);

router.use(errorHandler);

export default router;
