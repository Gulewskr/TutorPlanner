import { Header } from '@components/header';
import { Tile } from '@components/tile';
import { LessonDTO } from '@model';
import { lessonsService } from '@services/lessons.service';
import { studentsService } from '@services/students.service';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface StudentNextLessonProps {
    studentId: number;
}

const StudentNextLesson: React.FC<StudentNextLessonProps> = ({ studentId }) => {
    const [nextLesson, setNextLesson] = useState<LessonDTO | undefined>(() => {
        return undefined;
    });

    const navigateToCallendar = () => {
        //TODO - rather should open event modal and then -> `show in callendar`
    };

    const loadData = async () => {
        const data = await studentsService.getNextStudentLesson(studentId);
        if (data && 'name' in data) {
            setNextLesson(data);
        }
    };

    useEffect(() => {
        loadData();
    }, [studentId]);

    return (
        <View
            style={{
                position: 'relative',
                width: '100%',
                alignItems: 'center',
            }}
        >
            <Header title="Najbliższe zajęcia" isCentered />
            {nextLesson ? (
                <Pressable onPress={navigateToCallendar}>
                    <Tile>
                        <Text>
                            {nextLesson.name}{' '}
                            {`(${nextLesson.startHour} - ${nextLesson.endHour})`}
                        </Text>
                        <Text>{format(nextLesson.date, 'yyyy-MM-dd')}</Text>
                    </Tile>
                </Pressable>
            ) : (
                <Text>Brak zaplanowanych zajęć</Text>
            )}
        </View>
    );
};

const styles = EStyleSheet.create({});

export { StudentNextLesson };
