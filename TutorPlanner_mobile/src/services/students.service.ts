import { ErrorResponse, LessonDTO, StudentDTO, StudentsDTO } from '@model';
import { STUDENTS_URL } from './config';
import { axios } from './baseService';
import { AxiosError } from 'axios';

interface CreateStudentRequestData {
    firstname: string;
    surename: string;
    class?: string;
    extendedMath?: boolean;
    description?: string;
    defaultPrice?: number;
}

class StudentsService {
    getStudentsList = async (): Promise<StudentsDTO> => {
        try {
            const response = await axios.get(STUDENTS_URL);
            return response.data;
        } catch (error) {
            console.log('getStudentsList error');
            console.log(JSON.stringify(error, null, 2));
            return {
                data: [],
                size: 0,
                error: 'Error',
            };
        }
    };
    create = async (
        data: CreateStudentRequestData,
    ): Promise<StudentDTO | ErrorResponse> => {
        try {
            console.log(data);
            const response = await axios.post(STUDENTS_URL, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    status: error.status || 400,
                    message: error.message,
                };
            }
            return {
                status: 400,
                message: 'Error',
            };
        }
    };
    update = async (
        studnetId: number,
        data: CreateStudentRequestData,
    ): Promise<StudentDTO | ErrorResponse> => {
        try {
            const response = await axios.post(
                `${STUDENTS_URL}/${studnetId}`,
                data,
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    status: error.status || 400,
                    message: error.message,
                };
            }
            return {
                status: 400,
                message: 'Error',
            };
        }
    };
    getNextStudentLesson = async (
        studnetId: number,
    ): Promise<LessonDTO | undefined | ErrorResponse> => {
        try {
            const response = await axios.get(
                `${STUDENTS_URL}/${studnetId}/lessons/next`,
            );
            return response.data;
        } catch (error) {
            return {
                status: 400,
                message: 'Error',
            };
        }
    };
    recalculateBalance = async (studentId: number): Promise<StudentDTO> => {
        try {
            const response = await axios.post(
                STUDENTS_URL + `/${studentId}/recalculate`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };
}

export const studentsService = new StudentsService();
