import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Icon, ICON_NAME } from '@components/icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import { $border_width } from '@styles/global';
import { DEFAULT, DEFAULT_STYLES } from '@styles/theme';
import { white_bg } from '@styles/colors';

export interface InputProps {
    placeholder?: string;
    icon?: ICON_NAME;
    label?: string;
    defaultValue?: string | number;
    value?: string;
    textAlign?: 'center' | 'left' | 'right';
    //TODO - make this required later
    onChange?: (value: string) => void;
}

const CustomInput: React.FC<InputProps> = ({
    placeholder,
    icon,
    label,
    textAlign,
    onChange,
    defaultValue,
}) => {
    const initialValue = defaultValue ? String(defaultValue) : undefined;

    return (
        <View style={[styles.input]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.content}>
                {icon && (
                    <View
                        style={{
                            borderRightWidth: DEFAULT.border.width.m,
                            borderColor: DEFAULT.border.color,
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: DEFAULT.SPACING.XXS,
                        }}
                    >
                        <Icon icon={icon} />
                    </View>
                )}
                <TextInput
                    style={[styles.textInput]}
                    textAlign={textAlign}
                    placeholder={placeholder}
                    onChangeText={onChange}
                    defaultValue={initialValue}
                />
            </View>
        </View>
    );
};

CustomInput.displayName = 'CustomInput';

export default CustomInput;

const styles = EStyleSheet.create({
    input: {
        position: 'relative',
        width: '100%',
        minHeight: 40,
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
        height: 50,
        borderWidth: DEFAULT_STYLES.input.borderWidth,
        borderColor: DEFAULT_STYLES.input.borderColor,
        borderRadius: DEFAULT_STYLES.input.borderRadius,
        backgroundColor: white_bg,
        boxShadow: DEFAULT.boxShadow.tile.default,
    },

    textInput: {
        flex: 1,
        marginLeft: 10,
        fontWeight: DEFAULT_STYLES.input.fontWeight,
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
