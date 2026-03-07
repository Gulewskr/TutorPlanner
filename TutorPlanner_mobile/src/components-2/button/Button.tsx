import React from 'react';
import { Icon, ICON_NAME } from '@components/icon';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    primary,
    secondary as color_secondary,
    error_color,
    warning_color,
    success_color,
} from '@styles/colors';
import { DEFAULT, STYLES } from '@styles/theme';

type ButtonSeverity = 'success' | 'error' | 'warning';
interface ButtonProps {
    secondary?: boolean;
    type?: 'button' | 'icon-button';
    icon?: ICON_NAME;
    label?: string;
    onClick: () => void;
    disabled?: boolean;
    severity?: ButtonSeverity;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    secondary = false,
    type = 'button',
    disabled = false,
    label,
    icon,
    severity,
}) => {
    const [pressed, setPressed] = useState<boolean>(false);

    const style = styles(pressed, disabled);
    const isIconButton = type == 'icon-button';

    return (
        <Pressable
            disabled={disabled}
            style={[
                isIconButton ? style.iconButton : style.button,
                !severity && !secondary && style.primary,
                !severity && secondary && style.secondary,
                severity === 'success' && style.success,
                severity === 'warning' && style.warning,
                severity === 'error' && style.error,
                STYLES.border,
            ]}
            onPress={onClick}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
        >
            <View style={style.content}>
                {icon && <Icon icon={icon} />}
                {isIconButton || <Text style={[STYLES.text_styles.boldbody]}>{label}</Text>}
            </View>
        </Pressable>
    );
};

Button.displayName = 'Button';

export default Button;

const styles = (
    pressed: boolean,
    isDisabled: boolean
) =>
    EStyleSheet.create({
        iconButton: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            minWidth: 40,
            aspectRatio: 1,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 15,
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: DEFAULT.height.m,
            borderRadius: 15,
            flexGrow: 1,
            paddingLeft: 10,
            paddingRight: 10
        },
        primary: {
            backgroundColor: primary,
            boxShadow: pressed
                ? DEFAULT.boxShadow.primary.pressed
                : DEFAULT.boxShadow.primary.default,
        },
        secondary: {
            backgroundColor: color_secondary,
            boxShadow: pressed
                ? DEFAULT.boxShadow.secondary.pressed
                : DEFAULT.boxShadow.secondary.default,
        },
        error: {
            backgroundColor: error_color,
            boxShadow: pressed ? DEFAULT.boxShadow.error.pressed : DEFAULT.boxShadow.error.default,
        },
        success: {
            backgroundColor: success_color,
            boxShadow: pressed
                ? DEFAULT.boxShadow.success.pressed
                : DEFAULT.boxShadow.success.default,
        },
        warning: {
            backgroundColor: warning_color,
            boxShadow: pressed
                ? DEFAULT.boxShadow.warning.pressed
                : DEFAULT.boxShadow.warning.default,
        },
        content: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginVertical: 5,
            opacity: isDisabled ? 0.5 : 1,
        },
    });
