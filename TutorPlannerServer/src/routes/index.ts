import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', function (req, res, next) {
    res.json('HELLO WORLD :D');
});

export default router;
