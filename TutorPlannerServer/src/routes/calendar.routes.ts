import express, { Router } from 'express';
import LessonsService from '../services/LessonsService';
import EventsService from '../services/events/EventsService';
import { parseDate } from '../utils/utils';
import CalendarService from '../services/CalendarService';

const router: Router = express.Router();

/**
 * path: /calendar/monthly
 *
 * queryParams:
 * month:
 * year:
 */
router.get('/monthly', async (req, res, next) => {
    try {
        const { month, year } = req.query;
        if (!month || !year) {
            throw new Error('Missing month or year.');
        }
        const monthNumber = parseInt(month as string);
        const yearNumber = parseInt(year as string);

        if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            throw new Error('Invalid month.');
        }
        if (isNaN(yearNumber) || yearNumber < 1900) {
            throw new Error('Invalid year.');
        }

        const calendarData = await CalendarService.getCalendarData(
            monthNumber,
            yearNumber,
        );
        res.status(200).json(calendarData);
    } catch (err) {
        next(err);
    }
});

/*
 * path: /events/:id/cancel
 */
router.post('/:id/cancel', async (req, res, next) => {
    try {
        await LessonsService.updateLessonCancelationStatus(Number(req.params.id), true);
        res.status(200).json('Lessons has been canceled.');
    } catch (err) {
        next(err);
    }
});

export default router;
