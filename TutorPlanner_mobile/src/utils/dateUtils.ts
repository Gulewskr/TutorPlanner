const MAX_HOURS = 60 * 24;

export const getDateWithoutTZ = (date: Date): Date =>
    new Date(date.valueOf() - date.getTimezoneOffset() * 60 * 1000);

export const mapHourValueToDate = (value: number): Date => {
    if (MAX_HOURS < value || value < 0) {
        throw new Error('Hour value out of range');
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const date = new Date();
    date.setHours(hours, minutes);
    return date;
};

export const mapHourValueToText = (value: number): string => {
    if (MAX_HOURS < value || value < 0) {
        throw new Error('Hour value out of range');
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }`;
};

export const mapDateToHourValue = (date: Date): number => {
    return date.getHours() * 60 + date.getMinutes();
};
