import express, { Express, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import router from './routes/index';
import studentsRouter from './routes/students';

var app: Express = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);
app.use('/students', studentsRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (
    err: Error | any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err.message);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;
