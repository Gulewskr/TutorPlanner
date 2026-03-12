import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { format, isToday } from 'date-fns';
import { DayEventsData } from './model';
import {
    $color_black,
    $color_danger,
    $color_disabled,
    $color_primary_shadow,
    $color_warning,
    $color_white,
    primary,
    white,
} from '@styles/colors';
import { useMemo } from 'react';
import { DEFAULT } from '@styles/theme';

interface DayInCalendarProps {
    day: Date;
    eventsData: DayEventsData;
    isSelected: boolean;
    isBlackedOut?: boolean;
    onClick: () => void;
}

const DayInCalendar: React.FC<DayInCalendarProps> = ({
    day,
    eventsData,
    isSelected = false,
    isBlackedOut = false,
    onClick,
}) => {
    const [textColor, bgColor] = useMemo(() => {
        if (!eventsData) {
            return [$color_white, $color_danger];
        }
        if (eventsData.numOfUnpaidedLessons > 0) {
            return eventsData.numOfPaidedLessons > 0
                ? [$color_black, $color_warning]
                : [$color_white, 'red'];
        } else if (eventsData.numOfPaidedLessons > 0) {
            return [$color_black, primary];
        } else if (eventsData.canceledEventsNumber === eventsData.activeEventsNumber) {
            return [$color_white, $color_disabled];
        }
        return [$color_white, $color_danger];
    }, [eventsData]);

    return (
        <Pressable
            onPress={onClick}
            style={[
                styles.day,
                isToday(day) && styles.today,
                isSelected && styles.selected_day,
                isBlackedOut && styles.disabled,
                { position: 'relative' },
            ]}
        >
            <Text style={[
                styles.dayText,
                isToday(day) && styles.todayText,
                isSelected && styles.selectedText,
                isBlackedOut && styles.disabledText
            ]}>{format(day, 'd')}</Text>
            {eventsData && eventsData.activeEventsNumber > 0 && (
                <View style={[styles.event, { borderColor: bgColor }]}>
                    {/*
                    <Text
                        style={[
                            styles.event_text,
                            {
                                color: textColor,
                            },
                        ]}
                    >
                        {eventsData.activeEventsNumber}
                    </Text>
                    */}
                </View>
            )}
        </Pressable>
    );
};

const styles = EStyleSheet.create({
    selected_day: {
        backgroundColor: primary,
        boxShadow: DEFAULT.boxShadow.primary.pressed,
        borderColor: DEFAULT.border.color,
        borderWidth: DEFAULT.border.width.m,
    },
    selectedText: {
        backgroundColor: 'transparent',
        color: white,
        fontWeight: DEFAULT.calendar.fontWeight,
        textShadowColor: "black",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    today: {
        backgroundColor: DEFAULT.calendar.background,
    },
    todayText: {
        color: $color_primary_shadow,
    },
    event: {
        position: 'absolute',
        bottom: 6,
        left: '50%',
        width: 14,
        heigth: 2,
        borderWidth: 1,
        borderColor: primary,
        transform: [
            {translateX: -6}
        ]
    },
    event_text: {
        color: '$color_white',
        fontSize: 10,
        textAlign: 'center',
    },
    day: {
        borderRadius: 8,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: DEFAULT.calendar.fontSize,
        backgroundColor: DEFAULT.calendar.background,
    },
    dayText: {
        backgroundColor: 'transparent',
        color: primary,
        fontWeight: DEFAULT.calendar.fontWeight,
    },
    disabled: {
        backgroundColor: DEFAULT.calendar.disabled.background,
    },
    disabledText: {
        color: DEFAULT.calendar.disabled.color,
    },
});

export { DayInCalendar };
