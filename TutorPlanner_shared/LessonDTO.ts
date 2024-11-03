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
