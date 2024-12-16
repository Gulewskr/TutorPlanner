import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { format, isToday } from 'date-fns';
import { DayEventsData } from './model';
import {
    $color_black,
    $color_danger,
    $color_success,
    $color_warning,
} from '@styles/colors';

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
    //const dateKey = format(day, 'yyyy-MM-dd');
    console.log(eventsData);
    const hasUnpaidedEvents = eventsData && eventsData.numOfUnpaidedLessons > 0;
    const hasPaidedEvents = eventsData && eventsData.numOfPaidedLessons > 0;

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
            {eventsData && (
                <View
                    style={[
                        styles.event,
                        hasUnpaidedEvents && { backgroundColor: 'red' },
                        hasPaidedEvents && { backgroundColor: $color_success },
                        hasUnpaidedEvents &&
                            hasPaidedEvents && {
                                backgroundColor: $color_warning,
                            },
                    ]}
                >
                    <Text
                        style={[
                            styles.event_text,
                            hasPaidedEvents && {
                                color: $color_black,
                            },
                        ]}
                    >
                        {eventsData.amount}
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
        borderWidth: 1,
        top: -6,
        right: -6,
    },
    event_text: {
        color: '$color_white',
        fontSize: 10,
        textAlign: 'center',
    },
    day: {
        borderWidth: 1,
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
