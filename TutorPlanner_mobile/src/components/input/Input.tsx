import React, { useState } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { Icon, ICON_NAME } from '../icon/Icon';
import EStyleSheet from 'react-native-extended-stylesheet';

interface InputProps {
    title?: string;
    icon?: ICON_NAME;
    label?: string;
}

const CustomInput: React.FC<InputProps> = ({ title, icon, label }) => {
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
                <TextInput
                    style={styles.input}
                    placeholder={title ? `--${title}--` : ''}
                />
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
        backgroundColor: '$colorWhite',
        paddingHorizontal: 5,
        fontSize: 12,
        color: '$colorBlack',
        width: 120,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '$colorBlack',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '$colorBlack',
        borderRadius: 10,
        backgroundColor: '$colorWhite',
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
        backgroundColor: '$shadowColorPrimary',
        borderWidth: 1,
        borderColor: '$colorBlack',
        zIndex: -1,
    },
});
