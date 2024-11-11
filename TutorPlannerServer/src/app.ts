import express, { Express, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import router from './routes/index';
import studentsRouter from './routes/students.routes';
import lessonsRouter from './routes/lessons.routes';
import paymentsRouter from './routes/payments.routes';
import eventsRouter from './routes/events.routes';
import calendarRouter from './routes/calendar.routes';
import { errorHandler } from './middlewares/errorHandler';

// development
import { addDemoData } from './demoData/addDemoData';

var app: Express = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOption = {
    origin: ['*'],
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOption));

app.use('/', router);
app.use('/students', studentsRouter);
app.use('/events', eventsRouter);
app.use('/calendar', calendarRouter);
app.use('/lessons', lessonsRouter);
app.use('/payments', paymentsRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// DEV use only
//try {
//    addDemoData();
//} catch (e) {
//    console.log(JSON.stringify(e));
//    console.log('Error: Not able to add demo data!');
//}

module.exports = app;
