import React, { useState } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { Icon, ICON_NAME } from '@components/Icon';
import EStyleSheet from 'react-native-extended-stylesheet';

interface InputProps {
    placeholder?: string;
    icon?: ICON_NAME;
    label?: string;
}

const CustomInput: React.FC<InputProps> = ({ placeholder, icon, label }) => {
    const [width, setWidth] = useState(0);

    return (
        <View
            style={{ position: 'relative', marginTop: 10, width: 320 }}
            onLayout={event => {
                const { width } = event.nativeEvent.layout;
                setWidth(width);
            }}
        >
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.content}>
                {icon && <Icon icon={icon} />}
                <TextInput style={styles.input} placeholder={placeholder} />
            </View>

            <View style={[styles.shadow, { width }]}></View>
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
        height: 40,
        borderWidth: 1,
        borderColor: '$color_black',
        borderRadius: 10,
        backgroundColor: '$color_white',
        paddingHorizontal: 10,
    },

    input: {
        flex: 1,
        marginLeft: 10,
    },

    shadow: {
        borderRadius: 10,
        height: 40,
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: '$shadow_color_primary',
        borderWidth: 1,
        borderColor: '$color_black',
        zIndex: -1,
    },
});
