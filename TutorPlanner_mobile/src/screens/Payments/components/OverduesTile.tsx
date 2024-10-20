import { Header } from '@components/header';
import { Tile } from '@components/tile';
import { LessonDTO } from '@model';
import { $color_primary } from '@styles/colors';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

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
            <Tile color={numOfUnpaid ? 'red' : 'green'} centered>
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
            {!isLoading &&
                lessons &&
                lessons.map((p, i) => (
                    <Text key={i}>
                        {p.name} {JSON.stringify(p)}
                    </Text>
                ))}
        </>
    );
};
