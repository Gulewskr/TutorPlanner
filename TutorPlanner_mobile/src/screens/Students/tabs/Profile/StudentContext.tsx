import { LessonDTO, StudentDTO, StudentLessonsData } from '@model';
import { studentsService } from '@services/students.service';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface StudentProfileData {
    student: StudentDTO;
    studentLessons: StudentLessonsData;
    studentNextLesson?: LessonDTO;
}

interface StudnetContextProps {
    data: StudentProfileData;
    refresh: () => void;
    refreshLessons: (studentId: number) => void;
    refreshNextLesson: (studentId: number) => void;
    recalculate: (studentId: number) => void;
    loading: boolean;
}

const undefinedStudent: StudentDTO = {
    id: 0,
    firstname: '-',
    surename: '-',
    class: null,
    extendedMath: null,
    description: null,
    defaultPrice: null,
    balance: 0,
};

// Create the DataContext
export const StudentContext = createContext<StudnetContextProps>({
    loading: true,
    data: {
        student: undefinedStudent,
        studentLessons: {
            weeklyLessons: [],
            currentMonth: [],
        },
    },
    refresh: () => {},
    recalculate: (studentId: number) => {},
    refreshLessons: (studentId: number) => {},
    refreshNextLesson: (studentId: number) => {},
});

export const useStudentContext = () => useContext(StudentContext);

export const StudentContextProvider = ({
    children,
    studentId,
}: React.PropsWithChildren<{ studentId: number }>) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<StudentProfileData>({
        student: undefinedStudent,
        studentLessons: {
            weeklyLessons: [],
            currentMonth: [],
        },
    });

    useEffect(() => {
        setLoading(true);
        fetchStudentData(studentId);
        fetchStudentLessons(studentId);
        fetchStudentNextLesson(studentId);
        setLoading(false);
    }, [studentId]);

    const refresh = async (): Promise<void> => {
        const studentId = data.student.id;
        setLoading(true);
        fetchStudentData(studentId);
        fetchStudentLessons(studentId);
        fetchStudentNextLesson(studentId);
        setLoading(false);
    };

    const fetchStudentData = async (studentId: number): Promise<void> => {
        const res = await studentsService.getStudent(studentId);
        if (res) {
            setData(p => ({
                ...p,
                student: res,
            }));
        } else {
            //TODO alert error fetching student data
        }
    };

    const fetchStudentLessons = async (studentId: number): Promise<void> => {
        try {
            const res = await studentsService.getStudentLessonsData(studentId);
            setData(p => ({
                ...p,
                studentLessons: res,
            }));
        } catch (e) {
            console.log('Błąd pobierania danych studenta');
        }
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
