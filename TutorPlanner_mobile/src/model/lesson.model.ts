import {
    LessonDTO,
    LessonSeriesDTO,
} from '../../../TutorPlanner_shared/LessonDTO';

export interface StudentLessonsData {
    weeklyLessons: LessonSeriesDTO[];
    studentNextLesson?: LessonDTO;
    currentMonth: LessonDTO[];
}

export type { LessonDTO };
