import { StudentDTO } from '@model';
import { studentsService } from '@services/students.service';
import React, { createContext, useState, useEffect, useContext } from 'react';

type StudnetContextProps = {
    loading: boolean;
    data?: StudentDTO;
    fetch: (studId: number) => Promise<void>;
    error?: any;
};

// Create the DataContext
export const StudentContext = createContext<StudnetContextProps>({
    loading: true,
    data: undefined,
    fetch: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
});

export const useStudentsContext = () => useContext(StudentContext);

export const StudentsProvider = ({ children }: React.PropsWithChildren) => {
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState<StudentDTO | undefined>();

    const fetchData = async (studId: number): Promise<void> => {
        setLoading(true);
        const response = await studentsService.getStudent(studId);
        setLoading(false);
        if (response) {
            setStudentData(response);
        }
    };

    return (
        <StudentContext.Provider
            value={{
                loading: loading,
                data: studentData,
                fetch: fetchData,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};
