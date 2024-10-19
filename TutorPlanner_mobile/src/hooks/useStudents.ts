import { StudentDTO } from '@model';
import { studentsService } from '@services/students.service';
import { useEffect, useState } from 'react';

export const useStudents = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState<StudentDTO[]>([]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async (): Promise<void> => {
        const response = await studentsService.getStudentsList();
        setStudents(response.data);
        setLoading(false);
    };

    return {
        data: students,
        loading,
    };
};
