import express, { Router, Request } from 'express';
import EventsService from '../services/events/EventsService';
import { parseDate, parseReqestQueryToOptionalDate } from '../utils/utils';
import { updateEventSeriesSchema } from '../models/events/update-eventSeries.schema';
import { EventFilter } from '../services/events/events.filter';
import { EventResponseDTO } from '../models/events/event-response.dto';

const router: Router = express.Router();

//path: /events
router.get(
    '/',
    async (
        req: Request<
            {},
            EventResponseDTO[],
            {},
            {
                date?: string;
                eventType?: string;
                startDate?: string;
                endDate?: string;
            }
        >,
        res,
        next,
    ) => {
        try {
            const filters: EventFilter = new EventFilter({
                date: parseReqestQueryToOptionalDate(req.query.date),
                eventType: req.query.eventType,
            });

            /*
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
            */
            const results = await EventsService.filterEvents(filters);
            res.status(200).json(results);
        } catch (err) {
            next(err);
        }
    },
);

/**
 * path: /events
 *
 */
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        body.date = parseDate(body.date);

        const lesson = await EventsService.createEvent(body);
        res.status(200).json({
            message: 'Lessons has been created successfully.',
            data: lesson,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * path: /events/:id
 *
 */
router.get('/:id', async (req, res, next) => {
    try {
        const dto = await EventsService.getEvent(Number(req.params.id));
        res.status(200).json(dto);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const body = req.body;
        body.date = parseDate(body.date);

        const dto = await EventsService.updateEvent(
            Number(req.params.id),
            body,
        );
        res.status(200).json({
            message: 'Event has been updated successfully.',
            data: dto,
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const dto = await EventsService.deleteEvent(Number(req.params.id));
        res.status(200).json(dto);
    } catch (err) {
        next(err);
    }
});

/*
 * path: /events/:id/cancel
 */
router.post('/:id/cancel', async (req, res, next) => {
    try {
        await EventsService.cancelEvent(Number(req.params.id), true);
        res.status(200).json('Event has been canceled.');
    } catch (err) {
        next(err);
    }
});

router.delete('/:id/cancel', async (req, res, next) => {
    try {
        await EventsService.cancelEvent(Number(req.params.id), false);
        res.status(200).json('Event has been scheduled.');
    } catch (err) {
        next(err);
    }
});

/**
 * path: /events/series/:id
 *
 */
router.get('/series/:id', async (req, res, next) => {
    next();
});

/**
 * path: /events/:id/series
 *
 */
router.put('/:id/series', async (req, res, next) => {
    try {
        const parsedData = updateEventSeriesSchema.parse({
            ...req.body,
            date: parseDate(req.body.date),
        });
        await EventsService.updateEventSeries(
            Number(req.params.id),
            parsedData,
        );
        res.status(200).json({
            message: 'Event series has been updated successfully.',
        });
    } catch (err) {
        next(err);
    }
});

/**
 * path: /events/:id/series/cancel
 *
 */
router.post('/:id/series/cancel', async (req, res, next) => {
    try {
        await EventsService.cancelEventSeries(Number(req.params.id), true);
        res.status(200).json('Event has been scheduled.');
    } catch (err) {
        next(err);
    }
});

router.delete('/:id/series/cancel', async (req, res, next) => {
    try {
        await EventsService.cancelEventSeries(Number(req.params.id), false);
        res.status(200).json('Event has been scheduled.');
    } catch (err) {
        next(err);
    }
});

export default router;
