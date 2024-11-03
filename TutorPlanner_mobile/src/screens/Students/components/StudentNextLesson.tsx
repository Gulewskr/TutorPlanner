import React from 'react';
import { Header } from '@components/header';
import { LessonDTO } from '@model';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LessonTile } from '../../Lessons/components/LessonTile';

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
                paddingHorizontal: 15,
                alignItems: 'center',
            }}
        >
            <Header title="Najbliższe zajęcia" isCentered />
            {lesson ? (
                <Pressable onPress={navigateToCallendar}>
                    <LessonTile lesson={lesson} />
                </Pressable>
            ) : (
                <Text>Brak zaplanowanych zajęć</Text>
            )}
        </View>
    );
};

const styles = EStyleSheet.create({});

export { StudentNextLesson };
