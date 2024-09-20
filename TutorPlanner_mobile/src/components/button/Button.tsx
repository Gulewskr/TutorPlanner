import { Icon, ICON_NAME } from '@components/Icon';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface ButtonProps {
    secondary?: boolean;
    type?: 'button' | 'icon-button';
    icon?: ICON_NAME;
    label?: string;
    onClick: () => void;
    isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    secondary = false,
    type = 'button',
    isDisabled = false,
    label,
    icon,
}) => {
    const [pressed, setPressed] = useState<boolean>(false);
    const [buttonHeight, setButtonHeight] = useState<number>(0);
    const [width, setWidth] = useState(0);

    const style = styles(secondary, pressed, isDisabled);
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
                disabled={isDisabled}
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
            <View style={[style.shadow, { height: buttonHeight, width }]} />
        </View>
    );
};

Button.displayName = 'Button';

export default Button;

const styles = (secondary: boolean, pressed: boolean, isDisabled: boolean) =>
    EStyleSheet.create({
        container: {
            position: 'relative',
            flexDirection: 'row',
        },
        iconButton: {
            width: 40,
            minWidth: 40,
        },

        button: {
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 40,
            borderRadius: 10,
            flexGrow: 1,
            flexShrink: 1,
            maxWidth: 320,
            width: 155,
            minWidth: 130,

            backgroundColor: isDisabled
                ? '#6F6F6F'
                : secondary
                  ? pressed
                      ? '$colorSecondary_hover'
                      : '$colorSecondary'
                  : pressed
                    ? '$colorPrimary_hover'
                    : '$colorPrimary',
            position: 'relative',
            shadowColor: '#000000',
            elevation: 3,
            zIndex: 10,
            borderWidth: 1,
            borderColor: isDisabled ? '#4A4A4A' : '$colorBlack',
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
            color: '$colorBlack',
            flexShrink: 1,
            maxWidth: '80%',
            paddingBottom: 2,
        },

        shadow: {
            borderRadius: 10,
            position: 'absolute',
            top: 4,
            left: 4,
            backgroundColor: isDisabled
                ? '#6F6F6F'
                : secondary
                  ? '$shadowColorSecondary'
                  : '$shadowColorPrimary',
            borderWidth: 1,
            borderColor: isDisabled ? '#4A4A4A' : '$colorBlack',
            zIndex: 1,
        },
    });
