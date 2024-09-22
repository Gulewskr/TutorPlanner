import { StudentsDTO } from '@model';
import { STUDENTS_URL } from './config';
import { axios } from './baseService';

class StudentsService {
    getStudentsList = async (): Promise<StudentsDTO> => {
        try {
            const response = await axios.get(STUDENTS_URL);
            return response.data;
        } catch (error) {
            console.log('getStudentsList error');
            console.log(JSON.stringify(error, null, 2));
            throw error;
        }
    };
}

export const studentsService = new StudentsService();
