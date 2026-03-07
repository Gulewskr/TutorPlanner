import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from '@components-new/button';
import { ICON_NAME } from '@components-new/icon';
import { $color_black } from '@styles/colors';
import { DEFAULT } from '@styles/theme';

interface HeaderProps {
    isLeftActionDisabled?: boolean;
    leftAction?: () => void;
    leftIcon?: ICON_NAME;
    leftIconNoBG?: boolean;
    isCentered?: boolean;
    rightAction?: () => void;
    rightIcon?: ICON_NAME;
    subtitle?: string;
    title?: string;
    styles?: any;
    titleFontSize?: number;
    noBackground?: boolean;
    size?: 'xxs' | 's' | 'm' | 'l';
}

const sizes = {
    xxs: 30,
    s: 60,
    m: 70,
    l: 80,
};

const Header: React.FC<HeaderProps> = ({
    isLeftActionDisabled,
    leftIcon,
    leftAction,
    leftIconNoBG,
    title,
    subtitle,
    rightIcon,
    rightAction,
    isCentered: centered = false,
    styles: customStyles,
    titleFontSize,
    noBackground,
    size = 'l'
}) => {
    const leftActionActive = !isLeftActionDisabled && leftAction;

    return (
        <View style={[styles.header, !noBackground && styles.bg, customStyles && customStyles,
            {
                height: sizes[size],
            }
        ]}>
            {leftActionActive && (
                <View style={styles.left_icon}>
                    <Button icon={leftIcon} type="icon-button" secondary onClick={leftAction} />
                </View>
            )}
            <View
                style={[
                    styles.text_container,
                    {
                        alignItems: centered ? 'center' : 'flex-start',
                        paddingRight: rightIcon ? 0 : 50,
                        paddingLeft: leftActionActive ? 0 : centered ? 50 : 20,
                    },
                ]}
            >
                {title && (
                    <Text
                        style={{
                            fontSize: titleFontSize || 20,
                            fontWeight: 900,
                            color: $color_black,
                        }}
                    >
                        {title}
                    </Text>
                )}
                {subtitle && <Text style={styles.optional_text}>{subtitle}</Text>}
            </View>

            {rightAction && (
                <View style={styles.right_icon}>
                    <Button icon={rightIcon} type="icon-button" secondary onClick={rightAction} />
                </View>
            )}
        </View>
    );
};

Header.displayName = 'Header';

export default Header;

const styles = EStyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bg: {
        backgroundColor: DEFAULT.navbar.background,
        borderBottomWidth: DEFAULT.border.width.m,
        borderBottomColor: DEFAULT.border.color,
    },
    left_icon: {
        marginLeft: 10,
    },

    text_container: {
        flex: 1,
        alignItems: 'center',
    },

    main_text: {
        fontSize: 20,
        fontFamily: 'Modak_400Regular',
        fontWeight: 'bold',
    },

    optional_text: {
        fontSize: 14,
    },

    right_icon: {
        marginRight: 10,
    },
});
