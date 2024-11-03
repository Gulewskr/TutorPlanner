export type EventDTO = {
    name: string;
    id: number;
    date: Date;
    isCanceled: boolean;
    isOverridden: boolean;
    type: 'LESSON' | 'DEFAULT';
    eventSeriesId?: number;
    description?: string;
    startHour?: number;
    endHour?: number;
    price?: number;
    isPaid?: boolean;
    studentId?: number;
};
