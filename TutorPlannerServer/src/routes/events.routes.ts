import express, { Router } from 'express';
import LessonsService from '../services/LessonsService';
import EventsService from '../services/EventsService';
import { parseDate } from '../utils/utils';

const router: Router = express.Router();

/**
 * path: /events?
 *
 * queryParams:
 * startDate:
 * endDate:
 */
router.get('/', async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        if (startDate && endDate) {
            const _start = parseDate(startDate as string);
            const _end = parseDate(endDate as string);
            const results = await EventsService.getEventsInTimeFrame(
                _start,
                _end,
            );
            return res.status(200).json(results);
        }
        res.status(200).json([]);
    } catch (err) {
        next(err);
    }
});

/*
 * path: /events/:id/cancel
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
