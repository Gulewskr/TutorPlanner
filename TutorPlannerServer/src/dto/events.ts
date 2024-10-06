type EventDTO = {
    date: Date;
    name: string;
    type: 'default' | 'lesson';
    description: string;
    startHour: string;
    endHour: string;
    isCanceled: boolean;
    isOverridden: boolean;
};

export { EventDTO };
