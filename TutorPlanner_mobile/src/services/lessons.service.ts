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
            console.log(body);
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
}

export const lessonsService = new LessonsService();
