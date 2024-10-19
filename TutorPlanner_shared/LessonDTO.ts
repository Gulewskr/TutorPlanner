export type LessonDTO = {
    id: number;
    date: Date;
    name: string;
    description: string;
    startHour: string;
    endHour: string;
    isCanceled: boolean;
    isOverridden: boolean;
    price: number;
    isPaid: boolean;
    studentId: number;
    eventSeriesId?: number;
};
