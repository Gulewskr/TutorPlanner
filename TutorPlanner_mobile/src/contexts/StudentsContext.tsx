import { StudentDTO } from '@model';
import { studentsService } from '@services/students.service';
import { useQuery } from '@tanstack/react-query';
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
    const [students, setStudents] = useState<StudentDTO[]>([]);

    const studentsQuery = useQuery({
        queryKey: ['students'],
        queryFn: () => studentsService.getStudentsList(),
    });

    useEffect(() => {
        setStudents(
            studentsQuery.data?.data.sort((a, b) =>
                `${a.firstname}${a.surename}`.localeCompare(`${b.firstname}${b.surename}`),
            ) ?? [],
        );
    }, [studentsQuery.data, studentsQuery.isLoading]);

    return (
        <StudentContext.Provider
            value={{
                loading: studentsQuery.isLoading,
                data: students,
                fetch: async () => {
                    studentsQuery.refetch();
                },
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};
