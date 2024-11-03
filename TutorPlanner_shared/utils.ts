const MAX_HOURS = 60 * 24;

export const mapToHourText = (value: number): string => {
    if (MAX_HOURS < value || value < 0) {
        throw new Error('Hour value out of range');
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }`;
};

export const mapTextToHour = (date: Date): number => {
    return date.getHours() * 60 + date.getMinutes();
};
