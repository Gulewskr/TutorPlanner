import { getDaysInMonth } from 'date-fns';
import {
    LessonDTO,
    LessonSeriesDTO,
    mapEventSeriesToLessonSeriesDTO,
    toLessonDTO,
} from '../models/lesson';
import { lessonRepository } from '../repositories/lessonsRepository';

interface StudentLessonsData {
    weeklyLessons: LessonSeriesDTO[];
    studentNextLesson?: LessonDTO;
    currentMonth: LessonDTO[];
}

class StudentProfileService {
    public async getLessonsData(
        studnetId: number,
    ): Promise<StudentLessonsData> {
        const lessonsSeries =
            await lessonRepository.getLessonsSeriesByStudentId(studnetId);

        const startOfTimeframe = new Date();
        startOfTimeframe.setHours(0);

        const endOfMonth = new Date();
        endOfMonth.setDate(getDaysInMonth(startOfTimeframe));
        endOfMonth.setHours(24);

        const lessonsList = await lessonRepository.getLessons({
            studentId: studnetId,
            date: {
                gte: startOfTimeframe,
                lte: endOfMonth,
            },
        });
        const nextLesson =
            await lessonRepository.getNextLessonByStudentId(studnetId);
        return {
            weeklyLessons: lessonsSeries.map(series =>
                mapEventSeriesToLessonSeriesDTO(series),
            ),
            studentNextLesson: nextLesson
                ? toLessonDTO(nextLesson)
                : nextLesson,
            currentMonth: lessonsList.map(lesson => toLessonDTO(lesson)),
        };
    }
}

export default new StudentProfileService();
