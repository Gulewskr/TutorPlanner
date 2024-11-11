import React from 'react';
import { Icon, ICON_NAME } from '@components/icon';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

type ButtonSize = 'small' | 'medium' | 'large';
interface ButtonProps {
    secondary?: boolean;
    type?: 'button' | 'icon-button';
    icon?: ICON_NAME;
    label?: string;
    onClick: () => void;
    disabled?: boolean;
    size?: ButtonSize;
    hasShadow?: boolean;
    width?: number;
    severity?: 'warning' | 'error';
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    secondary = false,
    type = 'button',
    disabled = false,
    label,
    icon,
    size = 'medium',
    hasShadow = true,
    width: customWidth,
    severity,
}) => {
    const [pressed, setPressed] = useState<boolean>(false);
    const [buttonHeight, setButtonHeight] = useState<number>(0);
    const [width, setWidth] = useState(0);

    const style = styles(
        secondary,
        pressed,
        disabled,
        size,
        customWidth,
        severity,
    );
    const isIconButton = type == 'icon-button';

    return (
        <View
            style={[style.container, isIconButton && style.iconButton]}
            onLayout={event => {
                const { width } = event.nativeEvent.layout;
                setWidth(width);
            }}
        >
            <Pressable
                disabled={disabled}
                style={[style.button, isIconButton && style.iconButton]}
                onPress={onClick}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                onLayout={event => {
                    const { height } = event.nativeEvent.layout;
                    setButtonHeight(height);
                }}
            >
                <View style={style.content}>
                    {icon && <Icon icon={icon} />}
                    {isIconButton || <Text style={style.text}>{label}</Text>}
                </View>
            </Pressable>
            {hasShadow && (
                <View
                    style={[
                        style.shadow,
                        { height: buttonHeight, width: width - 5 },
                    ]}
                />
            )}
        </View>
    );
};

Button.displayName = 'Button';

export default Button;

const styles = (
    secondary: boolean,
    pressed: boolean,
    isDisabled: boolean,
    size: ButtonSize,
    width?: number,
    severity?: 'warning' | 'error',
) =>
    EStyleSheet.create({
        container: {
            position: 'relative',
            flexDirection: 'row',
            minHeight: size === 'medium' ? 50 : size === 'small' ? 40 : 60,
            width: '100%',
            paddingRight: 5,
        },
        iconButton: {
            width: 40,
            minWidth: 40,
            aspectRatio: 1,
        },

        button: {
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 40,
            borderRadius: 10,
            flexGrow: 1,
            flexShrink: 1,
            minWidth: width ? width : 130,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: isDisabled
                ? '$color_disabled_primary'
                : secondary
                  ? pressed
                      ? '$color_secondary_hover'
                      : '$color_secondary'
                  : severity == 'warning'
                    ? pressed
                        ? '$color_func'
                        : '$color_func'
                    : severity == 'error'
                      ? pressed
                          ? '#FF6B6B'
                          : '#FF6B6B'
                      : pressed
                        ? '$color_primary_hover'
                        : '$color_primary',
            position: 'relative',
            shadowColor: '#000000',
            elevation: 3,
            zIndex: 10,
            borderWidth: 1,
            borderColor: isDisabled ? '#4A4A4A' : '$color_black',
            top: pressed ? 4 : 0,
            left: pressed ? 4 : 0,
        },

        content: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginVertical: 5,
            opacity: isDisabled ? 0.5 : 1,
        },

        text: {
            fontSize: 12,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: '$color_black',
            flexShrink: 1,
            maxWidth: '80%',
            paddingBottom: 2,
        },

        shadow: {
            borderRadius: 10,
            position: 'absolute',
            top: 5,
            left: 5,
            backgroundColor: isDisabled
                ? '$color_disabled_primary'
                : secondary
                  ? '$shadow_color_secondary'
                  : '$shadow_color_primary',
            borderWidth: 1,
            borderColor: isDisabled ? '#4A4A4A' : '$color_black',
            zIndex: 1,
        },
    });
