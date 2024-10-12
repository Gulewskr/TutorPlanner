import { Header } from '@components/header';
import { Tile } from '@components/tile';
import { LessonDTO } from '@model';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface StudentNextLessonProps {
    studentId: number;
}

const StudentNextLesson: React.FC<StudentNextLessonProps> = ({ studentId }) => {
    const [nextLesson, setNextLesson] = useState<LessonDTO | undefined>(() => {
        //TODO
        return undefined;
    });

    const navigateToCallendar = () => {
        //TODO
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
            {nextLesson ? (
                <Pressable onPress={navigateToCallendar}>
                    <Tile>
                        <Text>
                            {
                                //TODO - fix formatting
                            }
                            {nextLesson.name} {nextLesson.startHour}
                            {' - '}
                            {nextLesson.date.toString()}
                        </Text>
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
