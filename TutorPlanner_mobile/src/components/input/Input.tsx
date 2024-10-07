import React, { useState } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { Icon, ICON_NAME } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';

export interface InputProps {
    placeholder?: string;
    icon?: ICON_NAME;
    label?: string;
    value?: string;
    //TODO - make this required later
    onChange?: (value: string) => void;
}

const CustomInput: React.FC<InputProps> = ({
    placeholder,
    icon,
    label,
    onChange,
}) => {
    const [width, setWidth] = useState(0);

    return (
        <View
            style={[styles.input, label && { marginTop: 5 }]}
            onLayout={event => {
                const { width } = event.nativeEvent.layout;
                setWidth(width);
            }}
        >
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.content}>
                {icon && <Icon icon={icon} />}
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    onChangeText={onChange}
                />
            </View>

            <View style={[styles.shadow, { width }]}></View>
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
        borderWidth: 1,
        borderColor: '$color_black',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 40,
        borderWidth: 1,
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
        borderWidth: 1,
        borderColor: '$color_black',
        zIndex: -1,
    },
});
