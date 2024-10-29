import { LessonDTO, StudentDTO } from '@model';
import { studentsService } from '@services/students.service';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface StudentProfileData {
    student?: StudentDTO;
    studentLessons?: LessonDTO[];
    studentNextLesson?: LessonDTO;
}

interface StudnetContextProps {
    data: StudentProfileData;
    refresh: (studentId: number) => void;
    refreshLessons: (studentId: number) => void;
    refreshNextLesson: (studentId: number) => void;
    recalculate: (studentId: number) => void;
    loading: boolean;
}

// Create the DataContext
export const StudentContext = createContext<StudnetContextProps>({
    loading: true,
    data: {},
    refresh: (studentId: number) => {},
    recalculate: (studentId: number) => {},
    refreshLessons: (studentId: number) => {},
    refreshNextLesson: (studentId: number) => {},
});

export const useStudentContext = () => useContext(StudentContext);

export const StudentContextProvider = ({
    children,
}: React.PropsWithChildren) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<StudentProfileData>({});

    const refresh = async (studentId: number): Promise<void> => {
        setLoading(true);
        fetchStudentData(studentId);
        fetchStudentLessons(studentId);
        fetchStudentNextLesson(studentId);
        setLoading(false);
    };

    const fetchStudentData = async (studentId: number): Promise<void> => {
        const res = await studentsService.getStudent(studentId);
        setData(p => ({
            ...p,
            student: res,
        }));
    };

    const fetchStudentLessons = async (studentId: number): Promise<void> => {
        const res = await studentsService.getStudentLessons(studentId);
        setData(p => ({
            ...p,
            studentLessons: res,
        }));
    };

    const fetchStudentNextLesson = async (studentId: number): Promise<void> => {
        const res = await studentsService.getNextStudentLesson(studentId);
        setData(p => ({
            ...p,
            studentNextLesson: res,
        }));
    };

    const recalculate = async (studentId: number): Promise<void> => {
        const res = await studentsService.recalculateBalance(studentId);
        setData(p => ({
            ...p,
            student: res,
        }));
    };

    return (
        <StudentContext.Provider
            value={{
                loading,
                data,
                refresh,
                recalculate: recalculate,
                refreshLessons: fetchStudentLessons,
                refreshNextLesson: fetchStudentNextLesson,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};
