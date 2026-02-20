import express, { Request, Router } from 'express';
import StudentService from '../services/StudentService';
import paymentRouter from './studentsRoutes/payments.routes';
import lessonsRouter from './studentsRoutes/lessons.routes';
import StudentPaymentsService from '../services/StudentPaymentsService';
import { getStudentIdFromParams } from './utils';
import StudentProfileService from '../services/StudentProfileService';
import { StudentsListDTO } from '../models/students/students-list-response.dto';
import { StudentDTO } from '../models/students/student-response.dto';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    const data: StudentsListDTO = await StudentService.getStudents();
    return res.status(200).json(data);
});

router.post('/', async (req, res, next) => {
    try {
        const createdStudent = await StudentService.createStudent(req.body);
        return res.status(200).json(createdStudent);
    } catch (err) {
        next(err);
    }
});

router.get('/:studentId', async (req, res, next) => {
    try {
        const studentId = getStudentIdFromParams(req);
        const student = await StudentService.getStudent(studentId);
        return res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.post('/:studentId', async (req, res, next) => {
    try {
        const studentId = getStudentIdFromParams(req);
        const student = await StudentService.updateStudent(studentId, req.body);
        return res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.delete('/:studentId', async (req, res, next) => {
    try {
        const studentId = getStudentIdFromParams(req);
        const student = await StudentService.disableStudent(studentId);
        return res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.post('/:studentId/recalculate', async (req: Request<{}, StudentDTO>, res, next) => {
    try {
        const studentId = getStudentIdFromParams(req);
        const student =
            await StudentPaymentsService.recalculateStudentBalance(studentId);
        return res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.use('/:studentId/payments', paymentRouter);
router.use('/:studentId/lessons', lessonsRouter);

/**
 * path: students/:studentId/profile/lessons
 *
 * returns StudentLessonsData
 */
router.get('/:studentId/profile/lessons', async (req, res, next) => {
    try {
        const studentId = getStudentIdFromParams(req);
        const lessons = await StudentProfileService.getLessonsData(studentId);
        return res.status(200).json(lessons);
    } catch (err) {
        next(err);
    }
});

/**
 * path: students/actions/recalculate-balances
 *
 * returns void
 */
router.post('/actions/recalculate-balances', async (req, res, next) => {
    try {
        await StudentPaymentsService.recalculateAllStudentsBalance();
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
});

export default router;
