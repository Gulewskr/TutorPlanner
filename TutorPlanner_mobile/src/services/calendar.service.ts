import { CALENDAR_URL } from './config';
import { axios } from './baseService';
import { CalendarDTO } from '@model';

class CalendarService {
    getMonthlyData = async (
        month: number,
        year: number,
    ): Promise<CalendarDTO> => {
        const res = await axios.get(`${CALENDAR_URL}/monthly`, {
            params: {
                year: year,
                month: month,
            },
        });
        return res.data;
    };
}

export const calendarService = new CalendarService();
