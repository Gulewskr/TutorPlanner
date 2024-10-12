import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Calendar } from '@components/complex/calendar';
import { EventWrapper } from '@components/complex/events';
import { Button } from '@components/button';
import { CalendarLayout } from '../CalendarLayout';
import { CalendarTabParamList } from '../calendarTabs';

export const MonthlyCalendar: React.FC<
    BottomTabScreenProps<CalendarTabParamList, 'MonthlyCalendar'>
> = props => {
    const { navigation, route } = props;
    const [selectedDay, setSelectedDay] = useState(new Date());
    const handleChangeDay = (newDay: Date) => {
        setSelectedDay(newDay);
    };
    return (
        <CalendarLayout {...props}>
            <ScrollView>
                <View
                    style={{
                        paddingHorizontal: 15,
                        gap: 15,
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Button
                        onClick={() => navigation.jumpTo('DailyCalendar')}
                        hasShadow
                        icon="calendar"
                        label="Przełącz na widok dzienny"
                    />
                    <Calendar
                        day={selectedDay}
                        handleChangeDay={handleChangeDay}
                    />
                    <EventWrapper day={selectedDay} />
                </View>
            </ScrollView>
        </CalendarLayout>
    );
};
