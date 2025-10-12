import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Button } from '@components/button';
import { CalendarLayout } from '../CalendarLayout';
import { CalendarTabParamList } from '../calendarTabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Tile } from '@components/tile';
import {
    startOfMonth,
    subDays,
    subMonths,
    addMonths,
    isSameMonth,
    isBefore,
    isSameYear,
    addDays,
    isSameDay,
    format,
} from 'date-fns';
import { DayInCalendar } from '../components/calendar/DayInCalendar';
import {
    getDayOfWeek,
    MONTHS_NOMINATIVE,
    WEEKDAYS,
} from '../components/calendar/utils';
import { useCalendarContext } from '../CalendarContext';
import { $color_primary_shadow } from '@styles/colors';
import { EventsList } from '@components/complex/eventslist';
import { $border_width } from '@styles/global';
import { setLoadingPage } from '@contexts/NavbarReducer';
import { useFocusEffect } from '@react-navigation/native';

const CALENDAR_WEEKS = [0, 1, 2, 3, 4, 5];
const WEEK_DAYS_RANGE = [0, 1, 2, 3, 4, 5, 6];

export const MonthlyCalendar: React.FC<
    BottomTabScreenProps<CalendarTabParamList, 'MonthlyCalendar'>
> = props => {
    const { navigation, route } = props;
    const [controlDate, setControlDate] = useState(new Date());

    const {
        calendarData,
        selectedDate,
        loading,
        selectDate,
        fetchMonthlyCalendarData,
    } = useCalendarContext();

    useFocusEffect(
        React.useCallback(() => {
            fetchMonthlyCalendarData(controlDate);
            return () => {};
        }, []),
    );

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setLoadingPage(false);
            }, 1000);
        }
    }, [loading]);

    useEffect(() => {
        fetchMonthlyCalendarData(controlDate);
    }, [controlDate]);

    const refresh = () => fetchMonthlyCalendarData(controlDate);

    const firstDayOfMonth = startOfMonth(controlDate);
    const firstDayInCallendar = subDays(
        firstDayOfMonth,
        getDayOfWeek(firstDayOfMonth),
    );

    const handlePreviousMonth = () => {
        setControlDate(subMonths(controlDate, 1));
    };

    const handleNextMonth = () => {
        setControlDate(addMonths(controlDate, 1));
    };

    const handleSelectDate = (day: Date) => {
        if (!isSameMonth(day, controlDate)) {
            isBefore(day, controlDate)
                ? handlePreviousMonth()
                : handleNextMonth();
        }
        setControlDate(day);
        selectDate(day);
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
                    {/*
                        <Button
                            onClick={() => navigation.jumpTo('DailyCalendar')}
                            hasShadow
                            icon="calendar"
                            label="Przełącz na widok dzienny"
                        />
                    */}
                    <View style={styles.container}>
                        <View style={styles.calendar}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    marginVertical: 10,
                                    gap: 10,
                                    justifyContent: 'center',
                                }}
                            >
                                <View>
                                    <Button
                                        type="icon-button"
                                        hasShadow={false}
                                        onClick={handlePreviousMonth}
                                        icon="arrowLeft"
                                        severity="warning"
                                        size="small"
                                    />
                                </View>
                                <View style={{ width: '55%' }}>
                                    <Tile
                                        color="white"
                                        centered
                                        hasShadow={false}
                                        height={20}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {
                                                MONTHS_NOMINATIVE[
                                                    controlDate.getMonth()
                                                ]
                                            }
                                            {!isSameYear(
                                                controlDate,
                                                new Date(),
                                            ) && format(controlDate, ' yyyy')}
                                        </Text>
                                    </Tile>
                                </View>
                                <View>
                                    <Button
                                        type="icon-button"
                                        hasShadow={false}
                                        onClick={handleNextMonth}
                                        icon="arrowRight"
                                        severity="warning"
                                        size="small"
                                    />
                                </View>
                            </View>
                            <View style={styles.grid}>
                                <View
                                    style={[
                                        styles.grid_loading_opacity,
                                        { display: loading ? 'flex' : 'none' },
                                    ]}
                                />
                                <View
                                    style={[
                                        styles.grid_loading,
                                        { display: loading ? 'flex' : 'none' },
                                    ]}
                                >
                                    <ActivityIndicator
                                        size={'large'}
                                        color={$color_primary_shadow}
                                    />
                                </View>
                                <View style={styles.grid_row}>
                                    {WEEKDAYS.map(day => (
                                        <Text key={day} style={styles.weekday}>
                                            {day}
                                        </Text>
                                    ))}
                                </View>
                                {CALENDAR_WEEKS.map(week => (
                                    <View key={week} style={styles.grid_row}>
                                        {WEEK_DAYS_RANGE.map(dayIndex => {
                                            const day = addDays(
                                                firstDayInCallendar,
                                                week * 7 + dayIndex,
                                            );
                                            const dateKey = format(
                                                day,
                                                'yyyy-MM-dd',
                                            );
                                            return (
                                                <DayInCalendar
                                                    day={day}
                                                    key={dayIndex}
                                                    eventsData={
                                                        calendarData[dateKey]
                                                    }
                                                    isBlackedOut={
                                                        !isSameMonth(
                                                            controlDate,
                                                            day,
                                                        )
                                                    }
                                                    isSelected={isSameDay(
                                                        selectedDate,
                                                        day,
                                                    )}
                                                    onClick={() =>
                                                        handleSelectDate(day)
                                                    }
                                                />
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.shadow} />
                    </View>
                    <EventsList
                        day={selectedDate}
                        navigation={navigation.getParent()}
                        onChange={refresh}
                    />
                </View>
            </ScrollView>
        </CalendarLayout>
    );
};

const styles = EStyleSheet.create({
    container: {
        height: 400,
        width: '100%',
    },
    calendar: {
        gap: 5,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        zIndex: 1,
        borderWidth: $border_width,
        alignItems: 'center',
        backgroundColor: '$tile_bgColor',
        borderColor: '$color_black',
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    shadow: {
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 10,
        backgroundColor: '$shadow_color_primary',
        zIndex: 0,
        borderWidth: $border_width,
        borderColor: '$color_black',
        width: '100%',
        height: '100%',
    },
    grid: {
        flexDirection: 'column',
        gap: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid_row: {
        gap: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
    },
    grid_loading_opacity: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.75,
        backgroundColor: '$tile_bgColor',
        zIndex: 1,
        justifyContent: 'center',
    },
    grid_loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        justifyContent: 'center',
    },
    weekday: {
        fontWeight: 'bold',
        textAlign: 'center',
        width: 40,
    },
});
