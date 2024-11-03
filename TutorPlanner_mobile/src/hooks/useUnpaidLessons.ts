import { LessonDTO } from '@model';
import { lessonsService } from '@services/lessons.service';
import { useEffect, useState } from 'react';

interface Filter {
    month: number;
    year: number;
}

export const useUnpaidLessons = (filter?: Filter) => {
    const [unpaidLessons, setUnpaidLessons] = useState<LessonDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (filter?: Filter) => {
        const response = filter
            ? await lessonsService.getNotPaidLessonsByMonthAndYear({
                  month: filter?.month + 1,
                  year: filter?.year,
              })
            : await lessonsService.getNotPaidLessonsByMonthAndYear();
        setUnpaidLessons(response);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData(filter);
    }, []);

    const fetchData = (props?: Filter) => {
        setIsLoading(true);
        loadData(props);
    };

    return { unpaidLessons, isLoading, fetchData };
};
