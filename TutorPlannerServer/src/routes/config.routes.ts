import express, { Router } from 'express';
import ConfigService from '../services/ConfigService';
import { errorHandler } from '../middlewares/errorHandler';

const router: Router = express.Router();

router.get('/welcome-message', async (req, res) => {
    const data = await ConfigService.getWelcomeMessage();
    res.status(200).json(data);
});

router.get('/version', async (req, res) => {
    const data = await ConfigService.getWelcomeMessage();
    res.status(200).json(data);
});

router.get('/version/check/:version', async (req, res) => {
    const data = await ConfigService.checkVersionSupport(req.params.version);
    res.status(200).json(data);
});

router.use(errorHandler);

export default router;
