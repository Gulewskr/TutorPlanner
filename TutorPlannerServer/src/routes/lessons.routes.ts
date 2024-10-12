import express, { Router } from 'express';
import LessonsService from '../services/LessonsService';
import { parsePaginationParams } from '../utils/utils';
import { LessonFilters } from '../models/lesson';

const router: Router = express.Router();

/**
 * path: /lessons?data=2020-01-01
 */
router.get('/', async (req, res, next) => {
    try {
        const filters: LessonFilters = {};

        if (req.query.date) {
            filters.date = req.query.date as string;
        }

        const lessons = await LessonsService.getLessons(filters);
        res.status(200).json(lessons);
    } catch (err) {
        next(err);
    }
});

/**
 * path: lessons/overdues?month=1&year=1
 *
 * response: LessonDAO[] | Pagable<LessonDAO>>
 */
router.get('/overdues', async (req, res, next) => {
    try {
        const { month, year } = req.query;
        const { page, pageSize } = parsePaginationParams(req);
        const lessons = await LessonsService.getOverdueLessons({
            month: month ? Number(month) : undefined,
            year: year ? Number(year) : undefined,
            page: page,
            pageSize: pageSize,
        });
        return res.status(200).json(lessons);
    } catch (err) {
        next(err);
    }
});

/**
 * path: lessons/
 */
router.post('/', async (req, res, next) => {
    try {
        const lesson = await LessonsService.createLesson(req.body);
        res.status(200).json({
            message: 'Lessons has been created successfully.',
            data: lesson,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * path: lessons/:id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const lesson = await LessonsService.getLesson(Number(req.params.id));
        res.status(200).json(lesson);
    } catch (err) {
        next(err);
    }
});

/*
 * path: /lessons/:id?session=true
 */
router.put('/:id', async (req, res, next) => {
    try {
        if (req.query.session) {
            await LessonsService.updateLessonSeries(
                Number(req.params.id),
                req.body,
            );
            const lesson = await LessonsService.getLesson(
                Number(req.params.id),
            );
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
    } catch (err) {
        next(err);
    }
});

/*
 * path: /lessons/:id/pay
 */
router.post('/:id/pay', async (req, res, next) => {
    try {
        await LessonsService.markLessonAsPaid(Number(req.params.id));
        res.status(200).json('Lessons has been marked as paid.');
    } catch (err) {
        next(err);
    }
});

/*
 * path: /lessons/:id/cancel
 */
router.post('/:id/cancel', async (req, res, next) => {
    try {
        await LessonsService.cancelLesson(Number(req.params.id));
        res.status(200).json('Lessons has been canceled.');
    } catch (err) {
        next(err);
    }
});

export default router;
