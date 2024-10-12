import { LessonDTO } from '@model';
import { LESSONS_URL } from './config';
import { axios } from './baseService';

interface LessonCreateRequestBody {
    name: string;
    description: string;
    student: number;
    price: number;
    date: Date;
    startHour: string;
    endHour: string;
    weekly: boolean;
}

class LessonsService {
    create = async (body: LessonCreateRequestBody): Promise<LessonDTO> => {
        try {
            if (
                !body.name ||
                !body.student ||
                !body.date ||
                !body.price ||
                !body.startHour ||
                !body.endHour
            ) {
                throw new Error(`Missing data`);
            }
            const response = await axios.post(LESSONS_URL, body);
            return response.data;
        } catch (error) {
            console.log('create lesson error');
            console.log(JSON.stringify(error, null, 2));
            throw error;
        }
    };
    getOverdues = async ({
        month,
        year,
    }: {
        month?: number;
        year?: number;
    } = {}): Promise<LessonDTO[]> => {
        try {
            if (!month && !year) {
                const response = await axios.get(`${LESSONS_URL}/overdues`);
                return response.data;
            } else {
                const response = await axios.get(
                    `${LESSONS_URL}/overdues?month=${month}&year=${year}`,
                );
                return response.data;
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
            throw error;
        }
    };
}

export const lessonsService = new LessonsService();
