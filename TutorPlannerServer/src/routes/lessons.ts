import express, { Router } from 'express';
import LessonsService from '../services/LessonsService';

var router: Router = express.Router();

router.get('/', async (req, res) => {
    //const filters = {};
    await LessonsService.getLessons(undefined);
});

router.get('/:id', async (req, res) => {
    await LessonsService.getLesson(Number(req.params.id));
});

router.post('/', async (req, res, next) => {
    await LessonsService.createLssson(req.body);
    res.status(200).json('Lessons has been created successfully.');
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
    } else {
        await LessonsService.updateLesson(Number(req.params.id), req.body);
    }
    res.status(200).json('Lessons has been created successfully.');
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
