import express, {
    Router,
    Express,
    Request,
    Response,
    NextFunction,
} from 'express';
import StudentService from '../services/StudentService';

var router: Router = express.Router();

router.get('/', async (req, res) => {
    const students = await StudentService.getStudents();
    res.status(200).json({
        data: students,
        size: students.length,
    });
});

router.get('/:studentId', async (req, res) => {
    const studentId = Number(req.params.studentId);
    if (Number.isNaN(studentId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid input. Wrong studentId provided.',
        });
    }
    const student = await StudentService.getStudent(studentId);
    res.status(200).json(student);
});

router.post('/', async (req, res, next) => {
    const createdStudent = await StudentService.createStudent(req.body);
    res.status(200).json(createdStudent);
});

export default router;
