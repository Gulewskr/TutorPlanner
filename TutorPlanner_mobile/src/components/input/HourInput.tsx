import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ICON_NAME } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { mapDateToHourValue, mapHourValueToDate } from '@utils/dateUtils';

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

            <View style={styles.shadow}></View>
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
    label: {
        position: 'absolute',
        top: -12,
        left: 10,
        zIndex: 2,
        backgroundColor: '$color_white',
        paddingHorizontal: 5,
        fontSize: 12,
        color: '$color_black',
        width: 120,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '$color_black',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        borderWidth: 1,
        borderColor: '$color_black',
        borderRadius: 15,
        backgroundColor: '$color_white',
        padding: 10,
    },
    hourinput: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '$color_black',
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hourinputText: {
        fontSize: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    separator: {
        width: 20,
        borderWidth: 0.5,
        margin: 10,
    },
    shadow: {
        borderRadius: 15,
        height: '100%',
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: '$shadow_color_primary',
        borderWidth: 1,
        width: '100%',
        borderColor: '$color_black',
        zIndex: -1,
    },
});
