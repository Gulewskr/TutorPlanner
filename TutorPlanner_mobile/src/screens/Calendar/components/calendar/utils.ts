import { getDay } from 'date-fns';

export const WEEKDAYS = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
export const WEEKDAYS_JS = ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
export const WEEKSDAYS_FULLNAMES = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
];

export const MONTHS_NOMINATIVE = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
];

export const getMonthName = (month: number): string => {
    if (month < 1 || month > 12) {
        return 'MONTH_OUT_OF_RANGE';
    }
    return MONTHS_NOMINATIVE[month - 1];
};

export const getDayOfWeek = (date: Date) => (getDay(date) + 6) % 7;
