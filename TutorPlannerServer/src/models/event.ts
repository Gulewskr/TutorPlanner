import { Event } from '@prisma/client';

export interface CreateEventRequestBody {
    name: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
    weekly: boolean;
}

export { Event as EventDAO };
