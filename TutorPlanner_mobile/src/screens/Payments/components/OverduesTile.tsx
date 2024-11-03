import { Header } from '@components/header';
import { LessonModal } from '@components/modals';
import { Tile } from '@components/tile';
import { useModalContext } from '@contexts/modalContext';
import { LessonDTO } from '@model';
import { LessonTile } from '@screens/Lessons/components/LessonTile';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

interface OverduesTileProps {
    isLoading: boolean;
    lessons?: LessonDTO[];
    navigation: any;
}

const upnpaidPaymentsText = (num: number): string =>
    `${num ? num : ''}${num == 0 ? 'Wszystkie zajęcia opłacone 🥰' : num > 4 ? ' nieopłaconych zajęć' : ' nieopłacone zajęcia'}`;

export const OverduesTile: React.FC<OverduesTileProps> = ({
    isLoading,
    lessons,
    navigation,
}) => {
    const { setIsOpen, setModalBody } = useModalContext();
    const numOfUnpaid = lessons?.length || 0;

    const handleShowEventModal = (lesson: LessonDTO) => {
        setModalBody(
            <LessonModal
                lesson={lesson}
                goToStudentProfile={() => {
                    navigation.navigate('Students', {
                        screen: 'Profile',
                        params: {
                            studentId: lesson.studentId,
                        },
                    });
                }}
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
        <>
            <Header
                title="Zaległości"
                isCentered
                styles={{ height: 30, marginBottom: 10 }}
            />
            <Tile
                color={numOfUnpaid ? 'red' : 'green'}
                hasShadow={false}
                centered
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}
                >
                    {isLoading
                        ? 'Ładowanie...'
                        : upnpaidPaymentsText(numOfUnpaid)}
                </Text>
            </Tile>
            {!isLoading && lessons && (
                <ScrollView
                    nestedScrollEnabled={true}
                    style={{ marginTop: 10 }}
                >
                    <View style={{ gap: 10, marginTop: 10, paddingBottom: 20 }}>
                        {lessons.map((lesson, i) => (
                            <LessonTile
                                lesson={lesson}
                                onClick={() => handleShowEventModal(lesson)}
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
        </>
    );
};
