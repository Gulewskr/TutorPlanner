import express, { Router } from 'express';

var router: Router = express.Router();

router.get('/', function (req, res, next) {
    res.json('HELLO WORLD :D');
});

export default router;