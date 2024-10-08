import React, { useState } from 'react';
import { View } from 'react-native';
import { DayProps, SingleDay } from './SingleDay';
import { addDays, subDays } from 'date-fns';

const daysRange = [-2, -1, 0, 1, 2];

export const DailyViewWrapper: React.FC<DayProps> = ({ day, onClick }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            {daysRange.map(offset => (
                <SingleDay
                    key={offset}
                    day={addDays(day, offset)}
                    selected={offset === 0}
                    onClick={onClick}
                />
            ))}
        </View>
    );
};
