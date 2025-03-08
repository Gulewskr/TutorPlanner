import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon, ICON_NAME } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import { format, parse } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { $border_width } from '@styles/global';

export interface DatepickerProps {
    placeholder?: string;
    icon?: ICON_NAME;
    label?: string;
    defaultValue?: string | Date;
    value?: string;
    //TODO - make this required later
    onChange?: (value?: string) => void;
    format?: string;
}

const Datepicker: React.FC<DatepickerProps> = ({
    placeholder,
    icon,
    label,
    onChange,
    defaultValue,
    format: datePattern = 'yyyy-MM-dd',
}) => {
    const initialValue = (): Date => {
        try {
            if (!defaultValue) {
                return new Date();
            }
            if (typeof defaultValue === 'string' && defaultValue.length < 12) {
                return parse(defaultValue, datePattern, new Date());
            }
            return new Date(defaultValue);
        } catch (e) {
            return new Date();
        }
    };

    const [width, setWidth] = useState(0);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [date, setDate] = useState(initialValue());
    const [dateText, setDateText] = useState('');

    const onDateChange = (event: Event, selectedDate?: Date) => {
        //@ts-ignore
        if (event === 'dismissed') {
            setShowPicker(false); // Hide the picker if user cancels
        } else if (selectedDate) {
            setShowPicker(false); // Hide the picker after time selection
            setDate(selectedDate); // Update the time state
        }
    };

    useEffect(() => {
        if (date) {
            const formatedDate = format(date, datePattern);
            onChange?.(formatedDate);
            setDateText(formatedDate);
        }
    }, [date]);

    return (
        <View
            style={[styles.input, label && { marginTop: 5 }]}
            onLayout={event => {
                const { width } = event.nativeEvent.layout;
                setWidth(width);
            }}
        >
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity onPress={() => setShowPicker(true)}>
                <View style={styles.content}>
                    {icon && <Icon icon={icon} />}
                    <Text style={styles.textInput}>
                        {dateText ? dateText : placeholder}
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={[styles.shadow, { width }]}></View>

            {showPicker && (
                <DateTimePicker
                    style={styles.input}
                    value={date}
                    mode="date"
                    is24Hour={true}
                    //@ts-ignore
                    onChange={onDateChange}
                />
            )}
        </View>
    );
};

Datepicker.displayName = 'CustomInput';

export default Datepicker;

const styles = EStyleSheet.create({
    input: {
        position: 'relative',
        width: '100%',
    },
    label: {
        position: 'absolute',
        top: -10,
        left: 10,
        zIndex: 2,
        backgroundColor: '$color_white',
        paddingHorizontal: 5,
        fontSize: 12,
        color: '$color_black',
        width: 120,
        height: 20,
        borderRadius: 15,
        borderWidth: $border_width,
        borderColor: '$color_black',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 40,
        borderWidth: $border_width,
        borderColor: '$color_black',
        borderRadius: 15,
        backgroundColor: '$color_white',
        padding: 10,
    },

    textInput: {
        flex: 1,
        marginLeft: 10,
    },

    shadow: {
        borderRadius: 15,
        height: '100%',
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: '$shadow_color_primary',
        borderWidth: $border_width,
        borderColor: '$color_black',
        zIndex: -1,
    },
});
