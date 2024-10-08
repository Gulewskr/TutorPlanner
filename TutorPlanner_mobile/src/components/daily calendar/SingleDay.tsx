import { WEEKDAYS_JS } from '@components/calendar';
import { Icon } from '@components/icon';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export interface DayProps {
    day: Date;
    selected?: boolean;
    onClick: (props: Date) => void;
}

export const SingleDay: React.FC<DayProps> = ({
    day,
    selected = false,
    onClick,
}) => {
    const dayOfWeek = WEEKDAYS_JS[day.getDay()];

    return (
        <View style={{ position: 'relative' }}>
            <Pressable
                style={[styles.container, selected && styles.active]}
                onPress={() => onClick(day)}
            >
                <Text style={[styles.text_day, selected && styles.active]}>
                    {dayOfWeek}
                </Text>
                <Text style={[styles.text_num, selected && styles.active]}>
                    {day.getDate()}
                </Text>
                <Icon icon="calendar"></Icon>
            </Pressable>
            <View style={styles.shadow} />
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        width: 60,
        height: 75,
        backgroundColor: '#F5D4F5',
        borderRadius: 10,
        borderWidth: 1,
        zIndex: 1,
    },

    active: {
        backgroundColor: '#FFA9F1',
        fontWeight: '600',
    },

    text_day: {
        fontWeight: '400',
    },
    text_num: {
        fontWeight: '400',
    },
    shadow: {
        position: 'absolute',
        top: 4,
        left: 4,
        width: '100%',
        height: 75,
        borderRadius: 10,
        backgroundColor: '$shadow_color_primary',
        zIndex: 0,
        borderWidth: 1,
        borderColor: '$color_black',
    },
});
