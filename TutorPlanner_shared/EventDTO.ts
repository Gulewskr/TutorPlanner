export type EventDTO = {
    name: string;
    id: number;
    date: Date;
    isCanceled: boolean;
    isOverridden: boolean;
    type: 'LESSON' | 'DEFAULT';
    eventSeriesId?: number;
    description?: string;
    startHour?: string;
    endHour?: string;
    price?: number;
    isPaid?: boolean;
    studentId?: number;
};
