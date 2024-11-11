import { StudentDTO } from '@model';
import { studentsService } from '@services/students.service';
import React, { createContext, useState, useEffect, useContext } from 'react';

type StudnetContextProps = {
    loading: boolean;
    data?: StudentDTO;
    fetch: (studId: number) => Promise<void>;
    selectStudent: (student: StudentDTO) => void;
    error?: any;
};

// Create the DataContext
export const StudentContext = createContext<StudnetContextProps>({
    loading: true,
    data: undefined,
    fetch: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    selectStudent: (student: StudentDTO) => {
        throw new Error('Function not implemented.');
    },
});

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }: React.PropsWithChildren) => {
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

    const selectStudent = async (student: StudentDTO): Promise<void> => {
        setStudentData(student);
    };

    return (
        <StudentContext.Provider
            value={{
                loading: loading,
                data: studentData,
                fetch: fetchData,
                selectStudent,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};
