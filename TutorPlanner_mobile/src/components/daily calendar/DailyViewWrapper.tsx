import React from 'react';
import { Text, View } from 'react-native';
import { Tile } from '@components/tile';
import { Icon } from '@components/icon';
import { WEEKDAYS_JS } from '@components/calendar';
import EStyleSheet from 'react-native-extended-stylesheet';

const daysRange = [-2, -1, 0, 1, 2];

interface DayProps {
    day: Date;
    selected?: boolean;
    onClick: (props: Date) => void;
}

export const DailyViewWrapper: React.FC<DayProps> = ({ day, onClick }) => {
    return (
        <View style={styles.container}>
            {daysRange.map(offset => {
                const adjustedDay = new Date(day);
                adjustedDay.setDate(day.getDate() + offset);
                const dayOfWeek = WEEKDAYS_JS[adjustedDay.getDay()];
                const selected = offset === 0;

                return (
                    <Tile
                        key={offset}
                        color={selected ? 'brightPink' : 'white'}
                        onClick={() => onClick(adjustedDay)}
                        centered
                        height={75}
                    >
                        <Text
                            style={[styles.text_day, selected && styles.active]}
                        >
                            {dayOfWeek}
                        </Text>
                        <Text
                            style={[styles.text_num, selected && styles.active]}
                        >
                            {adjustedDay.getDate()}
                        </Text>
                        <Icon icon="calendar" />
                    </Tile>
                );
            })}
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        width: 60,

        alignSelf: 'flex-start',
    },

    active: {
        backgroundColor: '#FFA9F1',
        fontWeight: '600',
    },

    text_day: {
        fontWeight: '400',
    },
    text_num: {
        fontWeight: '400',
    },
});
