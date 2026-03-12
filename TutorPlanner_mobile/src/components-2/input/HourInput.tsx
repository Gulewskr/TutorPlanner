import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ICON_NAME } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { mapDateToHourValue, mapHourValueToDate } from '@utils/dateUtils';
import { $border_width, $border_width_line } from '@styles/global';
import { white_bg } from '@styles/colors';
import { DEFAULT, DEFAULT_STYLES } from '@styles/theme';

interface HourInputProps {
    placeholder?: string;
    icon?: ICON_NAME;
    label?: string;
    onChange: ({
        startHour,
        endHour,
    }: {
        startHour: number;
        endHour: number;
    }) => void;
    //TODO - handle default value seems to be not simple
    defaultValue?: {
        startHour: number;
        endHour: number;
    };
}

const initialValue = (value?: number) => {
    if (value) {
        return mapHourValueToDate(value);
    }
    const initialTime = new Date();
    initialTime.setHours(0, 0, 0, 0); // Set hours and minutes to 00:00
    return initialTime;
};

const CustomInput: React.FC<HourInputProps> = ({
    placeholder,
    icon,
    label,
    onChange,
    defaultValue,
}) => {
    const [width, setWidth] = useState(0);
    const [showStartHourPicker, setStartHourPicker] = useState<boolean>(false);
    const [startHour, setstartHour] = useState(
        initialValue(defaultValue?.startHour),
    );
    const [showEndHourPicker, setEndHourPicker] = useState<boolean>(false);
    const [endHour, setEndHour] = useState(initialValue(defaultValue?.endHour));

    const formatTime = (date: Date): string => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        onChange({
            startHour: mapDateToHourValue(startHour),
            endHour: mapDateToHourValue(endHour),
        });
    }, [startHour, endHour]);

    const onChangeStartHour = (event: Event, selectedTime?: Date) => {
        //@ts-ignore
        if (event === 'dismissed') {
            setStartHourPicker(false); // Hide the picker if user cancels
        } else if (selectedTime) {
            setStartHourPicker(false); // Hide the picker after time selection
            setstartHour(selectedTime); // Update the time state
            setEndHour(selectedTime > endHour ? selectedTime : endHour); // Update the time state
        }
    };

    const onChangeEndHour = (event: Event, selectedTime?: Date) => {
        //@ts-ignore
        if (event === 'dismissed') {
            setEndHourPicker(false); // Hide the picker if user cancels
        } else if (selectedTime) {
            setEndHourPicker(false); // Hide the picker after time selection
            setEndHour(selectedTime < startHour ? startHour : selectedTime); // Update the time state
        }
    };

    return (
        <View
            style={[
                { position: 'relative', width: '100%' },
                !!label && { marginTop: 10 },
            ]}
        >
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.content}>
                <TouchableOpacity onPress={() => setStartHourPicker(true)}>
                    <View style={styles.hourinput}>
                        <Text style={styles.hourinputText}>
                            {formatTime(startHour)}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity onPress={() => setEndHourPicker(true)}>
                    <View style={styles.hourinput}>
                        <Text style={styles.hourinputText}>
                            {formatTime(endHour)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {showStartHourPicker && (
                <DateTimePicker
                    style={styles.input}
                    value={startHour}
                    mode="time"
                    is24Hour={true}
                    display="spinner" // You can also use 'default', 'clock' depending on your platform
                    //@ts-ignore
                    onChange={onChangeStartHour}
                />
            )}
            {showEndHourPicker && (
                <DateTimePicker
                    style={styles.input}
                    value={endHour}
                    mode="time"
                    is24Hour={true}
                    display="spinner" // You can also use 'default', 'clock' depending on your platform
                    //@ts-ignore
                    onChange={onChangeEndHour}
                />
            )}
        </View>
    );
};

CustomInput.displayName = 'CustomInput';

export default CustomInput;

const styles = EStyleSheet.create({
    input: {
        position: 'relative',
        width: '100%',
    },

    label: {
        zIndex: 2,
        paddingHorizontal: 5,
        color: '$color_black',
        width: '100%',
        fontSize: DEFAULT.fonsSize.body,
        fontWeight: DEFAULT.fontWeight.bold,
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderWidth: DEFAULT_STYLES.input.borderWidth,
        borderColor: DEFAULT_STYLES.input.borderColor,
        borderRadius: DEFAULT_STYLES.input.borderRadius,
        backgroundColor: white_bg,
        boxShadow: DEFAULT.boxShadow.tile.default,
    },
    hourinput: {
        borderRadius: 15,
        borderWidth: $border_width,
        borderColor: '$color_black',
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hourinputText: {
        fontSize: 20,
    },
    separator: {
        width: 20,
        borderWidth: $border_width_line,
        margin: 10,
    }
});
