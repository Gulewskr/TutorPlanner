import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    addDays,
    addMonths,
    format,
    isBefore,
    isSameDay,
    isSameMonth,
    isSameYear,
    startOfMonth,
    subDays,
    subMonths,
} from 'date-fns';
import { Button } from '@components-new/button';
import { DayInCalendar } from './calendar/DayInCalendar';
import { useCalendarContext } from '../CalendarContext';
import { getDayOfWeek, MONTHS_NOMINATIVE, WEEKDAYS } from './calendar/utils';
import { $tile_bgColor, primary, primary_hover, tile_bg } from '@styles/colors';
import { DEFAULT, STYLES } from '@styles/theme';

interface CalendarProps {
    controlDate: Date;
    setControlDate: (date: Date) => void;
}

const CALENDAR_WEEKS = [0, 1, 2, 3, 4, 5];
const WEEK_DAYS_RANGE = [0, 1, 2, 3, 4, 5, 6];

export const Calendar: React.FC<CalendarProps> = ({ controlDate, setControlDate }) => {
    const { calendarData, selectedDate, loading, selectDate } = useCalendarContext();

    const handlePreviousMonth = () => {
        setControlDate(subMonths(controlDate, 1));
    };

    const handleNextMonth = () => {
        setControlDate(addMonths(controlDate, 1));
    };

    const handleSelectDate = (day: Date) => {
        if (!isSameMonth(day, controlDate)) {
            isBefore(day, controlDate) ? handlePreviousMonth() : handleNextMonth();
        }
        setControlDate(day);
        selectDate(day);
    };
    
    const firstDayOfMonth = startOfMonth(controlDate);
    const firstDayInCallendar = subDays(firstDayOfMonth, getDayOfWeek(firstDayOfMonth));

    return (
        <View style={styles.calendar}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginVertical: 10,
                    paddingHorizontal: 5,
                    gap: 10,
                    justifyContent: 'center',
                    zIndex: 2,
                }}
            >
                <View>
                    <Button
                        type="icon-button"
                        onClick={handlePreviousMonth}
                        icon="arrowLeft"
                        severity="warning"
                    />
                </View>
                <View style={{ width: '55%' }}>
                    <View style={[
                        STYLES.border,
                        {
                            borderRadius: DEFAULT.border.radius.l,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: primary_hover,
                            boxShadow: DEFAULT.boxShadow.tile.pressed
                        }
                    ]}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            {MONTHS_NOMINATIVE[controlDate.getMonth()]}
                            {!isSameYear(controlDate, new Date()) && format(controlDate, ' yyyy')}
                        </Text>
                    </View>
                </View>
                <View>
                    <Button
                        type="icon-button"
                        onClick={handleNextMonth}
                        icon="arrowRight"
                        severity="warning"
                    />
                </View>
            </View>
            <View style={styles.grid}>
                <View
                    style={[styles.grid_loading_opacity, { display: loading ? 'flex' : 'none' }]}
                />
                <View style={[styles.grid_loading, { display: loading ? 'flex' : 'none' }]}>
                    <ActivityIndicator size={'large'} color={primary} />
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
                            const day = addDays(firstDayInCallendar, week * 7 + dayIndex);
                            const dateKey = format(day, 'yyyy-MM-dd');
                            return (
                                <DayInCalendar
                                    day={day}
                                    key={dayIndex}
                                    eventsData={calendarData[dateKey]}
                                    isBlackedOut={!isSameMonth(controlDate, day)}
                                    isSelected={isSameDay(selectedDate, day)}
                                    onClick={() => handleSelectDate(day)}
                                />
                            );
                        })}
                    </View>
                ))}
            </View>
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
    calendar: {
        gap: 5,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        zIndex: 1,
        borderWidth: DEFAULT.border.width.m,
        alignItems: 'center',
        backgroundColor: $tile_bgColor,
        borderColor: '$color_black',
        position: 'relative',
        width: '100%',
        height: '100%',
        boxShadow: DEFAULT.boxShadow.tile.default,
    },
    shadow: {
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 10,
        backgroundColor: '$shadow_color_primary',
        zIndex: 0,
        borderWidth: DEFAULT.border.width.m,
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
        overflow: 'hidden'
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
