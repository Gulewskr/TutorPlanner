import { Button } from '@components/button';
import { Tile } from '@components/tile';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isToday,
    startOfMonth,
    subDays,
    subMonths,
} from 'date-fns';
import { useMemo, useState } from 'react';

interface CalendarProps {
    day: Date;
    handleChangeDay: (props: Date) => void;
}

const WEEKDAYS = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
const MONTHS_NOMINATIVE = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
];

const Calendar: React.FC<CalendarProps> = ({ day, handleChangeDay }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Temp data :)
    const events = [
        { date: subDays(new Date(), 4) },
        { date: addDays(new Date(), 1) },
        { date: addDays(new Date(), 1) },
    ];

    const eventsByDate = useMemo(() => {
        return events.reduce<{ [key: string]: Event[] }>((acc, event) => {
            const dateKey = format(event.date, 'yyyy-MM-dd');
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(event);
            return acc;
        }, {});
    }, [events]);

    // Current month

    const firstDayOfMonth = startOfMonth(selectedDate);
    const lastDayOfMonth = endOfMonth(selectedDate);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;
    const endingDayIndex = (getDay(lastDayOfMonth) + 6) % 7;

    // Previous month

    const previousMonthLastDay = subDays(firstDayOfMonth, 1);
    const previousMonthDays = Array.from({ length: startingDayIndex }).map(
        (_, index) =>
            subDays(previousMonthLastDay, startingDayIndex - index - 1),
    );
    const emptyDaysAtEnd = endingDayIndex === 6 ? 0 : 6 - endingDayIndex;

    // Next month

    const nextMonthFirstDay = addDays(lastDayOfMonth, 1);

    const nextMonthDays = Array.from({ length: emptyDaysAtEnd }).map(
        (_, index) => addDays(nextMonthFirstDay, index),
    );

    const handlePreviousMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    const handleCalendarChanges = (day: Date) => {
        day.getMonth() < selectedDate.getMonth()
            ? handlePreviousMonth()
            : day.getMonth() > selectedDate.getMonth()
              ? handleNextMonth()
              : '';
        handleChangeDay(day);
        setSelectedDate(day);
    };

    const renderDay = (day: Date, style: any, keyPrefix: string) => {
        const dateKey = format(day, 'yyyy-MM-dd');
        const todaysEvents = eventsByDate[dateKey] || [];

        return (
            <Pressable
                onPress={() => handleCalendarChanges(day)}
                key={`${keyPrefix}-${dateKey}`}
                style={[
                    style,
                    isToday(day) && styles.today,
                    selectedDate.getDate() === day.getDate() &&
                        styles.selected_day,
                    { position: 'relative' },
                ]}
            >
                <Text>{format(day, 'd')}</Text>

                {/*temp data*/}
                {todaysEvents.map((event, index) => (
                    <View key={index} style={styles.event}>
                        <Text style={styles.event_text}>
                            {todaysEvents.length}
                        </Text>
                    </View>
                ))}
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendar}>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                    <Button
                        type="icon-button"
                        hasShadow={false}
                        onClick={handlePreviousMonth}
                        icon="minus"
                    />
                    <Tile color="white" centered hasShadow={false} width={200}>
                        {MONTHS_NOMINATIVE[selectedDate.getMonth()]}{' '}
                        {selectedDate.getFullYear() !==
                            new Date().getFullYear() &&
                            format(selectedDate, 'yyyy')}
                    </Tile>
                    <Button
                        type="icon-button"
                        hasShadow={false}
                        onClick={handleNextMonth}
                        icon="plus"
                    />
                </View>
                <View style={styles.grid}>
                    {WEEKDAYS.map(day => (
                        <Text key={day} style={styles.weekday}>
                            {day}
                        </Text>
                    ))}

                    {previousMonthDays.map((day, index) =>
                        renderDay(day, styles.empty_day, 'prev'),
                    )}

                    {daysInMonth.map(day =>
                        renderDay(day, styles.day, 'current'),
                    )}

                    {nextMonthDays.map((day, index) =>
                        renderDay(day, styles.empty_day, 'next'),
                    )}
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
    },

    calendar: {
        gap: 5,
        alignItems: 'center',
        width: 320,
        height: 400,
        borderRadius: 10,
        backgroundColor: '$tile_bgColor',
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#000000',
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
        borderColor: '#000000',
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
    selected_day: {
        backgroundColor: '$color_secondary',
    },
    empty_day: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '$color_disabled_primary',
    },
    day: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '$color_primary',
    },
    today: {
        backgroundColor: '$shadow_color_primary',
        borderColor: '#000',
        color: 'red',
    },
    event: {
        width: 16,
        heigth: 10,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 50,
        borderWidth: 1,
        top: -6,
        right: -6,
    },
    event_text: {
        color: '#fff',
        fontSize: 10,
        textAlign: 'center',
    },
});
