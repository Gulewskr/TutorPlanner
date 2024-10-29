import { Header } from '@components/header';
import { Tile } from '@components/tile';
import { LessonDTO } from '@model';
import { studentsService } from '@services/students.service';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface StudentNextLessonProps {
    lesson?: LessonDTO;
}

const StudentNextLesson: React.FC<StudentNextLessonProps> = ({ lesson }) => {
    const navigateToCallendar = () => {
        //TODO - rather should open event modal and then -> `show in callendar`
    };

    return (
        <View
            style={{
                position: 'relative',
                width: '100%',
                alignItems: 'center',
            }}
        >
            <Header title="Najbliższe zajęcia" isCentered />
            {lesson ? (
                <Pressable onPress={navigateToCallendar}>
                    <Tile>
                        <Text>
                            {lesson.name}{' '}
                            {`(${lesson.startHour} - ${lesson.endHour})`}
                        </Text>
                        <Text>{format(lesson.date, 'yyyy-MM-dd')}</Text>
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
