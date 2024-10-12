export const getDateWithoutTZ = (date: Date): Date =>
    new Date(date.valueOf() - date.getTimezoneOffset() * 60 * 1000);
