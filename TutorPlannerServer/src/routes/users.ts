import express, {
    Router,
    Express,
    Request,
    Response,
    NextFunction,
} from 'express';

var router: Router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Response for user route');
});

export default router;
