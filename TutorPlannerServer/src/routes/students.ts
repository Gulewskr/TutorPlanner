import express, { Router } from 'express';
import StudentService from '../services/StudentService';
import PaymentsService from '../services/PaymentsService';

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

router.post('/:studentId', async (req, res) => {
    const studentId = Number(req.params.studentId);
    if (Number.isNaN(studentId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid input. Wrong studentId provided.',
        });
    }
    const student = await StudentService.updateStudent(studentId, req.body);
    res.status(200).json(student);
});

router.get('/:studentId/payments/', async (req, res) => {
    const studentId = Number(req.params.studentId);
    if (Number.isNaN(studentId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid input. Wrong studentId provided.',
        });
    }
    const payments = await PaymentsService.getStudentPayments(studentId);
    res.status(200).json(payments);
});

router.post('/:studentId/payments/', async (req, res) => {
    const studentId = Number(req.params.studentId);
    if (Number.isNaN(studentId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid input. Wrong studentId provided.',
        });
    }
    const payment = await PaymentsService.addPayment({
        ...req.body,
        studentId: studentId,
    });
    res.status(200).json(payment);
});

router.post('/', async (req, res, next) => {
    const createdStudent = await StudentService.createStudent(req.body);
    res.status(200).json(createdStudent);
});

export default router;
