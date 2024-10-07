import { StudentDTO } from '@model';
import { studentsService } from '@services/students.service';
import { useEffect, useState } from 'react';

export const useStudents = () => {
    const [students, setStudents] = useState<StudentDTO[]>([]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async (): Promise<void> => {
        const response = await studentsService.getStudentsList();
        setStudents(response.data);
    };

    return students;
};
