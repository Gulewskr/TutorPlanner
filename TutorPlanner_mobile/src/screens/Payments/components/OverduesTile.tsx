import { Header } from '@components/header';
import { Tile } from '@components/tile';
import { LessonDTO } from '@model';
import { mapHourValueToText } from '@utils/dateUtils';
import { format } from 'date-fns';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

interface OverduesTileProps {
    numOfUnpaid: number;
    isLoading: boolean;
    lessons?: LessonDTO[];
}

const upnpaidPaymentsText = (num: number): string =>
    `${num ? num : ''}${num == 0 ? 'Wszystkie zajęcia opłacone 🥰' : num > 5 ? ' nieopłaconych zajęć' : ' nieopłacone zajęcia'}`;

export const OverduesTile: React.FC<OverduesTileProps> = ({
    numOfUnpaid,
    isLoading,
    lessons,
}) => {
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
                    <View style={{ gap: 10, marginTop: 10 }}>
                        {lessons.map((lesson, i) => (
                            <Tile key={i} color="white">
                                <View
                                    style={{
                                        paddingVertical: 3,
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {lesson.name}
                                    </Text>
                                    <Text>
                                        {format(lesson.date, 'yyyy-MM-dd')}
                                        {'  '}
                                        {mapHourValueToText(lesson.startHour)}-
                                        {mapHourValueToText(lesson.endHour)}
                                    </Text>
                                </View>
                            </Tile>
                        ))}
                    </View>
                </ScrollView>
            )}
        </>
    );
};
