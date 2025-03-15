import express, { Router } from 'express';
import LessonsService from '../services/LessonsService';
import { parseDate, parsePaginationParams } from '../utils/utils';
import { LessonFilters } from '../models/lesson';

const router: Router = express.Router();

/**
 * path: /lessons?data=2020-01-01
 * queryParams:
 *  data eg. 2020-01-01
 *  month: eg. 1
 *  year: eg. 2020
 */
router.get('/', async (req, res, next) => {
    try {
        const filters: LessonFilters = {};

        if (req.query.date) {
            filters.date = req.query.date as string;
        }

        if (req.query.month && req.query.year) {
            const monthNumber = parseInt(req.query.month as string);
            const yearNumber = parseInt(req.query.year as string);

            if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
                throw new Error('Invalid month.');
            }
            if (isNaN(yearNumber) || yearNumber < 1900) {
                throw new Error('Invalid year.');
            }

            filters.month = monthNumber;
            filters.year = yearNumber;
        }

        const lessons = await LessonsService.getLessons(filters);
        res.status(200).json(lessons);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedLesson = await LessonsService.deleteLesson(+id);
        res.status(200).json({
            data: deletedLesson,
            message: 'Lesson deleted successfully',
        });
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
        const lessons = await LessonsService.getCurrentOverdueLessons();
        return res.status(200).json(lessons);
    } catch (err) {
        next(err);
    }
});

/**
 * path: lessons/notpaid?month=1&year=1
 *
 * response: LessonDAO[] | Pagable<LessonDAO>>
 */
router.get('/notpaid', async (req, res, next) => {
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
        const body = req.body;
        body.date = parseDate(body.date);

        const lesson = await LessonsService.createLesson(body);
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

router.put('/:id', async (req, res, next) => {
    try {
        const body = req.body;
        body.date = parseDate(body.date);

        const lesson = await LessonsService.updateLesson(
            Number(req.params.id),
            body,
        );
        res.status(200).json({
            message: 'Lessons has been updated successfully.',
            data: lesson,
        });
    } catch (err) {
        next(err);
    }
});

/*
 * path: /lessons/series/:id
 */
router.put('/series/:id', async (req, res, next) => {
    try {
        const seriesId = Number(req.params.id);
        const body = req.body;
        body.date = parseDate(body.date);

        await LessonsService.updateLessonsTypeSeries(seriesId, body);
        const lesson = await LessonsService.getLesson(seriesId);
        res.status(200).json({
            message: 'Lessons has been updated successfully.',
            data: lesson,
        });
    } catch (err) {
        next(err);
    }
});


/*
 * path: /lessons/:lessonId/series
 */
router.put('/:lessonId/series', async (req, res, next) => {
    try {
        const lessonId = Number(req.params.lessonId);
        const body = req.body;
        body.date = parseDate(body.date);
        console.log(body.date);
        await LessonsService.updateSeriesOfLesson(lessonId, body);
        const lesson = await LessonsService.getLesson(lessonId);
        res.status(200).json({
            message: 'Lessons has been updated successfully.',
            data: lesson,
        });
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
        await LessonsService.cancelLesson(Number(req.params.id), true);
        res.status(200).json('Lessons has been canceled.');
    } catch (err) {
        next(err);
    }
});

router.delete('/:id/cancel', async (req, res, next) => {
    try {
        await LessonsService.cancelLesson(Number(req.params.id), false);
        res.status(200).json('Cancelation of lesson has been reverted.');
    } catch (err) {
        next(err);
    }
});

/*
 * path: /lessons/:id/series/:seriesId/cancel
 */
router.post('/:id/series/cancel', async (req, res, next) => {
    try {
        await LessonsService.cancelSereisOfLesson(Number(req.params.id), true);
        res.status(200).json(
            'Cancelation of lessons series has been canceled.',
        );
    } catch (err) {
        next(err);
    }
});

router.delete('/:id/series/cancel', async (req, res, next) => {
    try {
        await LessonsService.cancelSereisOfLesson(Number(req.params.id), false);
        res.status(200).json(
            'Cancelation of lessons series has been canceled.',
        );
    } catch (err) {
        next(err);
    }
});

export default router;
