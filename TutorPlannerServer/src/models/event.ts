import { Event, EventType } from '@prisma/client';

export interface CreateEventRequestBody {
    name: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
    weekly: boolean;
}

//TODO - unchecked
export const isEventType = (value: string): boolean => {
    return [EventType.DEFAULT, EventType.LESSON].includes(value as EventType);
}

export { Event as EventDAO };
