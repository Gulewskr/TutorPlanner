import { LessonDTO } from '@model';
import { LESSONS_URL, STUDENTS_URL } from './config';
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
            if (!body.name || !body.student || !body.date || !body.price) {
                throw new Error(`Missing data`);
            }
            const response = await axios.post(LESSONS_URL, body);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    update = async (
        lessonId: number,
        body: Partial<LessonCreateRequestBody>,
    ): Promise<LessonDTO> => {
        try {
            const response = await axios.put(
                `${LESSONS_URL}/${lessonId}`,
                body,
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    updateSeries = async (
        seriesId: number,
        body: Partial<LessonCreateRequestBody>,
    ): Promise<LessonDTO> => {
        try {
            const response = await axios.put(
                `${LESSONS_URL}/series/${seriesId}`,
                body,
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    getLessonsInDay = async (date: Date): Promise<LessonDTO[]> => {
        try {
            if (!date) throw new Error('Missing data');
            const formattedDate = date.toISOString().split('T')[0]; // np 2024-10-05
            const response = await axios.get(LESSONS_URL, {
                params: {
                    date: formattedDate,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    getLesson = async (lessonId: number): Promise<LessonDTO> => {
        try {
            const response = await axios.get(`${LESSONS_URL}/${lessonId}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    getLessons = async ({
        month,
        year,
    }: { month?: number; year?: number } = {}): Promise<LessonDTO[]> => {
        try {
            if (month && year) {
                const response = await axios.get(LESSONS_URL, {
                    params: {
                        month,
                        year,
                    },
                });
                return response.data;
            }
            const response = await axios.get(LESSONS_URL);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    getNotPaidLessonsByMonthAndYear = async ({
        month,
        year,
    }: {
        month?: number;
        year?: number;
    } = {}): Promise<LessonDTO[]> => {
        try {
            if (!month && !year) {
                const response = await axios.get(`${LESSONS_URL}/notpaid`);
                return response.data;
            } else {
                const response = await axios.get(`${LESSONS_URL}/notpaid`, {
                    params: {
                        month,
                        year,
                    },
                });
                return response.data;
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
            throw error;
        }
    };
    getOverdues = async (studentId?: number): Promise<LessonDTO[]> => {
        try {
            if (studentId) {
                const response = await axios.get(
                    `${STUDENTS_URL}/${studentId}/lessons/overdues`,
                );
                return response.data;
            } else {
                const response = await axios.get(`${LESSONS_URL}/overdues`);
                return response.data;
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
            throw error;
        }
    };
}

export const lessonsService = new LessonsService();
