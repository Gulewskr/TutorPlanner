import express, {
    Router,
    Express,
    Request,
    Response,
    NextFunction,
} from 'express';

var router: Router = express.Router();

router.get('/', function (req, res, next) {
    res.json('HELLO WORLD - index');
});

export default router;
