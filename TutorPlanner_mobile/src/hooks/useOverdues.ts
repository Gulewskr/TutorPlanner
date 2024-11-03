import { LessonDTO } from '@model';
import { lessonsService } from '@services/lessons.service';
import { useEffect, useState } from 'react';

export const useOverdues = () => {
    const [overdueLessons, setOverdueLessons] = useState<LessonDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        const response = await lessonsService.getOverdues();
        setOverdueLessons(response);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const refresh = () => {
        setIsLoading(true);
        loadData();
    };

    return { overdueLessons, isLoading, refresh };
};
