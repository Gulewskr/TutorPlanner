import { StudentDTO } from '@model';
import { studentsService } from '@services/students.service';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface ServerDataContext<T> {
    loading: boolean;
    data: T;
    fetch: () => Promise<void>;
    error?: any; //TODO error object
}

type StudnetContextProps = ServerDataContext<StudentDTO[]>;

// Create the DataContext
export const StudentContext = createContext<StudnetContextProps>({
    loading: true,
    data: [],
    fetch: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
});

export const useStudentsContext = () => useContext(StudentContext);

export const StudentsProvider = ({ children }: React.PropsWithChildren) => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState<StudentDTO[]>([]);

    const fetchData = async (): Promise<void> => {
        setLoading(true);
        const response = await studentsService.getStudentsList();
        setLoading(false);
        setStudents(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <StudentContext.Provider
            value={{
                loading: loading,
                data: students,
                fetch: fetchData,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};
