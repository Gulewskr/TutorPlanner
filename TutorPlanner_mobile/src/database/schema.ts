import Realm, { BSON, ObjectSchema } from 'realm';

enum SERIES_TYPE {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}

export class EventSeries extends Realm.Object<EventSeries> {
    _id!: BSON.ObjectId;
    date!: Date;
    hours_from!: number; // 0 - 1440
    hours_to!: number; // 0 - 1440
    name!: string;
    description!: string;
    isImportant!: boolean;
    seriesType!: SERIES_TYPE;
    day!: string; // daily = -, weekly, monthly = 2, 3 || [2, 3], yearly = 1-10, 1-11
    from_date!: Date;
    to_date!: Date;

    static schema: ObjectSchema = {
        name: 'EventSeries',
        properties: {
            _id: 'objectId',
            date: 'date',
            hours_from: 'number',
            hours_to: 'number',
            name: 'string',
            description: 'string',
            isImportant: 'boolean',
            seriesType: 'string',
            day: 'string',
            from_date: 'date',
            to_date: 'date',
        },
        primaryKey: '_id',
    };
}

export class Event extends Realm.Object<Event> {
    _id!: BSON.ObjectId;
    date!: Date;
    hours_from!: number; // 0 - 1440
    hours_to!: number; // 0 - 1440
    name!: string;
    description!: string;
    isImportant!: boolean;
    event?: EventSeries;

    static schema: ObjectSchema = {
        name: 'Event',
        properties: {
            _id: 'objectId',
            date: 'date',
            name: 'string',
            description: 'string',
            hours_from: 'number',
            hours_to: 'number',
            isImportant: 'boolean',
            event: 'EventSeries?',
        },
        primaryKey: '_id',
    };
}

export class Lesson extends Realm.Object<Lesson> {
    _id!: BSON.ObjectId;
    custom_price!: number;
    done!: boolean;
    paided!: boolean;
    canceled!: boolean;
    event!: Event;
    student!: Student;

    static schema: ObjectSchema = {
        name: 'Lesson',
        properties: {
            _id: 'objectId',
            custom_price: 'number',
            done: 'boolean',
            paided: 'boolean',
            canceled: 'boolean',
            event: 'Event',
            student: 'Student',
        },
        primaryKey: '_id',
    };
}

export class Student extends Realm.Object<Student> {
    _id!: BSON.ObjectId;
    name!: string;
    lastname!: string;
    default_price!: number;

    static schema: ObjectSchema = {
        name: 'Student',
        properties: {
            _id: 'objectId',
            name: 'string',
            lastname: 'string',
            default_price: 'number',
        },
        primaryKey: '_id',
    };
}

export class Payment extends Realm.Object<Payment> {
    _id!: BSON.ObjectId;
    date!: Date;
    amount!: number;
    student!: Student;

    static schema: ObjectSchema = {
        name: 'Payment',
        properties: {
            _id: 'objectId',
            date: 'date',
            amount: 'number',
            student: 'Student',
        },
        primaryKey: '_id',
    };
}

//TODO ADD CHANGE + CONFIG according to model
