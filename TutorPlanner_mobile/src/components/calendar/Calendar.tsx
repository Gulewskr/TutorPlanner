import { Button } from '@components/button';
import { Tile } from '@components/tile';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    addDays,
    addMonths,
    format,
    isSameDay,
    isSameMonth,
    isSameYear,
    startOfMonth,
    subDays,
    subMonths,
} from 'date-fns';
import { useMemo, useState } from 'react';
import { DayEventsData } from './model';
import { DayInCalendar } from './DayInCalendar';
import { MONTHS_NOMINATIVE, WEEKDAYS } from './constraints';
import { getDayOfWeek } from './utils';

interface CalendarProps {
    day: Date;
    handleChangeDay: (props: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ day, handleChangeDay }) => {
    const [selectedDate, setSelectedDate] = useState(day || new Date());
    const [controlDate, setControlDate] = useState(selectedDate);

    // Temp data :)
    const events = [
        { date: subDays(new Date(), 4) },
        { date: addDays(new Date(), 1) },
        { date: addDays(new Date(), 1) },
    ];

    const eventsByDate = useMemo(() => {
        return events.reduce<{ [key: string]: DayEventsData }>((acc, event) => {
            const dateKey = format(event.date, 'yyyy-MM-dd');
            acc[dateKey] = acc[dateKey] || {
                amount: 0,
            };
            acc[dateKey].amount++;
            return acc;
        }, {});
    }, [events]);

    const firstDayOfMonth = startOfMonth(controlDate);
    const firstDayInCallendar = subDays(
        firstDayOfMonth,
        getDayOfWeek(firstDayOfMonth),
    );
    const CALLENDAR_LENGTH = 6 * 7;

    const handlePreviousMonth = () => {
        setControlDate(subMonths(controlDate, 1));
    };

    const handleNextMonth = () => {
        setControlDate(addMonths(controlDate, 1));
    };

    const handleCalendarChanges = (day: Date) => {
        day.getMonth() < controlDate.getMonth()
            ? handlePreviousMonth()
            : day.getMonth() > controlDate.getMonth()
              ? handleNextMonth()
              : '';
        handleChangeDay(day);
        setSelectedDate(day);
    };

    return (
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
                        />
                    </View>
                    <View style={{ width: '55%' }}>
                        <Tile color="white" centered hasShadow={false}>
                            {MONTHS_NOMINATIVE[controlDate.getMonth()]}
                            {!isSameYear(controlDate, new Date()) &&
                                format(controlDate, ' yyyy')}
                        </Tile>
                    </View>
                    <View>
                        <Button
                            type="icon-button"
                            hasShadow={false}
                            onClick={handleNextMonth}
                            icon="arrowRight"
                            severity="warning"
                        />
                    </View>
                </View>
                <View style={styles.grid}>
                    {WEEKDAYS.map(day => (
                        <Text key={day} style={styles.weekday}>
                            {day}
                        </Text>
                    ))}
                    {Array.from({ length: CALLENDAR_LENGTH }).map((_, i) => {
                        const day = addDays(firstDayInCallendar, i);
                        const dateKey = format(day, 'yyyy-MM-dd');
                        return (
                            <DayInCalendar
                                day={day}
                                key={`callendar-${i}`}
                                eventsData={eventsByDate[dateKey]}
                                isBlackedOut={!isSameMonth(controlDate, day)}
                                isSelected={isSameDay(selectedDate, day)}
                                onClick={() => handleCalendarChanges(day)}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={styles.shadow} />
        </View>
    );
};

Calendar.displayName = 'Calendar';

export default Calendar;

const styles = EStyleSheet.create({
    constainer: {
        position: 'relative',
        backgroundColor: 'black',
    },
    calendar: {
        gap: 5,
        alignItems: 'center',
        width: 320,
        height: 400,
        borderRadius: 10,
        zIndex: 1,
        borderWidth: 1,
        backgroundColor: '$tile_bgColor',
        borderColor: '$color_black',
        position: 'relative',
    },
    shadow: {
        position: 'absolute',
        top: 8,
        left: 8,
        width: 320,
        height: 400,
        borderRadius: 10,
        backgroundColor: '$shadow_color_primary',
        zIndex: 0,
        borderWidth: 1,
        borderColor: '$color_black',
    },
    grid: {
        flexDirection: 'row',
        gap: 5,
        flexWrap: 'wrap',
        marginLeft: 4,
    },
    weekday: {
        fontWeight: 'bold',
        textAlign: 'center',
        width: 40,
    },
});
