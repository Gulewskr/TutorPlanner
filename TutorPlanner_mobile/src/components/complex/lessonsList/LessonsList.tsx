import * as React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { LessonDTO } from '@model';
import { $color_primary } from '@styles/colors';
import { useModalContext } from '@contexts/modalContext';
import { LessonModal } from '@components/modals';
import { LessonTile } from '@screens/Lessons/components/LessonTile';

interface LessonsListProps {
    lessons: LessonDTO[];
    isLoading: boolean;
    navigation: any;
}

export const LessonsList: React.FC<LessonsListProps> = ({
    lessons,
    isLoading,
    navigation,
}) => {
    const { setIsOpen, setModalBody } = useModalContext();

    const handleShowEventModal = (lesson: LessonDTO) => {
        setModalBody(
            <LessonModal
                lesson={lesson}
                goToEditForm={() => {
                    navigation.navigate('Lessons', {
                        screen: 'Edit',
                        params: {
                            lessonId: lesson.id,
                        },
                    });
                }}
            />,
        );
        setIsOpen(true);
    };

    return (
        <View style={{ maxHeight: 500, marginBottom: 200 }}>
            {isLoading ? (
                <ActivityIndicator size="large" color={$color_primary} />
            ) : lessons.length ? (
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ gap: 10, paddingBottom: 20 }}>
                        {lessons.map((event: LessonDTO, i) => (
                            <LessonTile
                                lesson={event}
                                onClick={() => handleShowEventModal(event)}
                            />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <Text>Brak zajęć</Text>
            )}
        </View>
    );
};
