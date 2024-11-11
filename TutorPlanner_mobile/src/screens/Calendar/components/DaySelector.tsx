import React from 'react';
import { ScrollView, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DayTile } from './DayTile';
import { addDays, differenceInDays, getDay, getDaysInMonth } from 'date-fns';
import { DayEventsData } from './calendar/model';
import { Button } from '@components/button';

const daysRange = [-2, -1, 0, 1, 2];

interface DaySelectorProps {
    day: Date;
    onClick: (props: Date) => void;
    calendarData: { [dateKey: string]: DayEventsData };
}

export const DaySelector: React.FC<DaySelectorProps> = ({
    day,
    onClick,
    calendarData,
}) => {
    const startDate = new Date(day.getFullYear(), day.getMonth() + 1, 0);
    const offset = differenceInDays(startDate, day) * 65;

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                    height: 100,
                }}
                contentOffset={{
                    x: offset,
                    y: 0,
                }}
            >
                <Button
                    icon="arrowLeft"
                    type="icon-button"
                    onClick={() => {}}
                />
                {Array.from({ length: getDaysInMonth(day) }, (_, i) => {
                    const offset = i + 1;
                    const adjustedDay = addDays(startDate, offset);

                    return (
                        <DayTile
                            key={offset}
                            day={adjustedDay}
                            isSelected={offset === 0}
                            onClick={() => onClick(adjustedDay)}
                        />
                    );
                })}
                <Button
                    icon="arrowRight"
                    type="icon-button"
                    onClick={() => {}}
                />
            </ScrollView>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
