import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DayTile } from './DayTile';
import { addDays } from 'date-fns';

const daysRange = [-2, -1, 0, 1, 2];

interface DaySelectorProps {
    day: Date;
    onClick: (props: Date) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ day, onClick }) => {
    return (
        <View style={styles.container}>
            {daysRange.map(offset => {
                const adjustedDay = addDays(new Date(day), offset);

                return (
                    <DayTile
                        key={offset}
                        day={adjustedDay}
                        isSelected={offset === 0}
                        onClick={() => onClick(adjustedDay)}
                    />
                );
            })}
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
