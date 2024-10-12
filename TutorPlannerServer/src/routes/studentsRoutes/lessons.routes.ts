import express, { Router } from 'express';
import LessonsService from '../../services/LessonsService';
import { parseStudentId } from './utils';
import { toLessonDTO } from '../../models/lesson';

const router: Router = express.Router({ mergeParams: true });

/**
 * path: students/:studentId/lessons
 */
router.get('/', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const student = await LessonsService.getStudentLessons(studentId);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

/**
 * path: students/:studentId/lessons/next
 */
router.get('/next', async (req, res, next) => {
    try {
        const studentId = parseStudentId(req);
        const lesson = await LessonsService.getNextStudentLessons(studentId);
        res.status(200).json(lesson ? toLessonDTO(lesson) : '');
    } catch (err) {
        next(err);
    }
});

/**
 * path: students/:studentId/lessons
 */
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
