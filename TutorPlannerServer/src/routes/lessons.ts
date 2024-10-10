import express, { Router } from 'express';
import LessonsService from '../services/LessonsService';

const router: Router = express.Router();

export interface Filters {
    date?: string; // Opcjonalna właściwość date
}

router.get('/', async (req, res) => {
    try {
        const filters: Filters = {};

        if (req.query.date) {
            filters.date = req.query.date as string;
        }

        const lessons = await LessonsService.getLessons(filters);
        res.status(200).json(lessons);
    } catch (error) {
        if (error instanceof Error) {
            error = error.message;
            res.status(400).json({
                message: error,
            });
        }
    }
});

router.get('/:id', async (req, res) => {
    const lesson = await LessonsService.getLesson(Number(req.params.id));
    res.status(200).json(lesson);
});

router.post('/', async (req, res, next) => {
    try {
        const lesson = await LessonsService.createLesson(req.body);
        res.status(200).json({
            message: 'Lessons has been created successfully.',
            data: lesson,
        });
    } catch (e) {
        res.json(e);
        res.status(400);
    }
});

/*
 * /lessons/{id}?session=true
 */
router.put('/:id', async (req, res, next) => {
    if (req.query.session) {
        await LessonsService.updateLessonSeries(
            Number(req.params.id),
            req.body,
        );
        const lesson = await LessonsService.getLesson(Number(req.params.id));
        res.status(200).json({
            message: 'Lessons has been updated successfully.',
            data: lesson,
        });
    } else {
        const lesson = await LessonsService.updateLesson(
            Number(req.params.id),
            req.body,
        );
        res.status(200).json({
            message: 'Lessons has been updated successfully.',
            data: lesson,
        });
    }
});

router.post('/:id/pay', async (req, res, next) => {
    await LessonsService.markLessonAsPaid(Number(req.params.id));
    res.status(200).json('Lessons has been marked as paid.');
});

router.post('/:id/cancel', async (req, res, next) => {
    await LessonsService.cancelLesson(Number(req.params.id));
    res.status(200).json('Lessons has been canceled.');
});

export default router;
