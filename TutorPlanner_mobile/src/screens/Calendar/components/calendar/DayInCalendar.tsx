import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { format, isToday } from 'date-fns';
import { DayEventsData } from './model';
import {
    $color_black,
    $color_danger,
    $color_disabled,
    $color_success,
    $color_warning,
    $color_white,
} from '@styles/colors';
import { useMemo } from 'react';
import { $border_width } from '@styles/global';

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
            return [$color_black, $color_success];
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
            <Text>{format(day, 'd')}</Text>
            {eventsData && eventsData.activeEventsNumber > 0 && (
                <View style={[styles.event, { backgroundColor: bgColor }]}>
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
                </View>
            )}
        </Pressable>
    );
};

const styles = EStyleSheet.create({
    selected_day: {
        backgroundColor: '$color_secondary',
    },
    today: {
        backgroundColor: '$shadow_color_primary',
        borderColor: '$color_black',
        color: 'red',
    },
    event: {
        width: 16,
        heigth: 10,
        position: 'absolute',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: $border_width,
        top: -6,
        right: -6,
    },
    event_text: {
        color: '$color_white',
        fontSize: 10,
        textAlign: 'center',
    },
    day: {
        borderWidth: $border_width,
        borderColor: '$color_black',
        borderRadius: 8,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '$color_primary',
    },
    disabled: {
        backgroundColor: '$color_disabled_primary',
    },
});

export { DayInCalendar };
