import express, { Router } from 'express';
import LessonsService from '../../services/LessonsService';
import { parseStudentId } from './utils';

/**
 * path: students/:studentId/lessons/
 */
const router: Router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const student = await LessonsService.getStudentLessons(studentId);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const student = await LessonsService.addUserLesson(studentId, req.body);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

export default router;
