export type LessonDTO = {
    id: number;
    date: Date;
    name: string;
    description: string;
    startHour: number;
    endHour: number;
    isCanceled: boolean;
    isOverridden: boolean;
    price: number;
    isPaid: boolean;
    studentId: number;
    eventSeriesId?: number;
};

export type LessonSeriesDTO = {
    id: number;
    daysOfWeek: number[];
    name: string;
    description: string;
    startHour: number;
    endHour: number;
    price: number;
    studentId: number;
};

export interface StudentLessonsData {
    weeklyLessons: LessonSeriesDTO[];
    studentNextLesson?: LessonDTO;
    currentMonth: LessonDTO[];
}
