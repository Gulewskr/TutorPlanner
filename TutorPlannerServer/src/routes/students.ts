import express, { Request, Response, Router } from 'express';
import StudentService from '../services/StudentService';
import paymentRouter from './payments';
import LessonsService from '../services/LessonsService';
import { StudentsDTO } from '../dto/students';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    const data: StudentsDTO = await StudentService.getStudents();
    res.status(200).json(data);
});

router.post('/', async (req, res) => {
    try {
        const createdStudent = await StudentService.createStudent(req.body);
        res.status(200).json(createdStudent);
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(400).json(err);
    }
});

router.get('/:studentId', async (req, res) => {
    const studentId = validateStudentId(req, res);
    if (studentId == -1) return;
    const student = await StudentService.getStudent(studentId);
    res.status(200).json(student);
});

router.post('/:studentId', async (req, res) => {
    const studentId = validateStudentId(req, res);
    if (studentId == -1) return;
    const student = await StudentService.updateStudent(studentId, req.body);
    res.status(200).json(student);
});

router.use('/:studentId/payments', paymentRouter);

router.get('/:studentId/lessons', async (req, res) => {
    const studentId = validateStudentId(req, res);
    if (studentId == -1) return;
    const student = await LessonsService.getStudentLessons(studentId);
    res.status(200).json(student);
});

router.post('/:studentId/lessons', async (req, res) => {
    try {
        const studentId = validateStudentId(req, res);
        if (studentId == -1) return;
        const student = await LessonsService.addUserLesson(studentId, req.body);
        res.status(200).json(student);
    } catch (e) {
        res.json(e);
        res.status(400);
    }
});

const validateStudentId = (req: Request, res: Response): number => {
    const studentId = Number(req.params.studentId);
    if (Number.isNaN(studentId)) {
        res.status(400).json({
            status: 'error',
            message: 'Invalid input. Wrong studentId provided.',
        });
        return -1;
    }
    return studentId;
};

export default router;
