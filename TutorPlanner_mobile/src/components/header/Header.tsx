import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from '@components/button';
import { ICON_NAME } from '@components/icon';

interface HeaderProps {
    leftAction?: () => void;
    leftIcon?: ICON_NAME;
    isCentered?: boolean;
    rightAction?: () => void;
    rightIcon?: ICON_NAME;
    subtitle?: string;
    title?: string;
}

const Header: React.FC<HeaderProps> = ({
    leftIcon,
    leftAction,
    title,
    subtitle,
    rightIcon,
    rightAction,
    isCentered: centered = false,
}) => {
    return (
        <View style={styles.header}>
            {leftAction && (
                <View style={styles.left_icon}>
                    <Button
                        icon={leftIcon}
                        type="icon-button"
                        secondary
                        onClick={leftAction}
                        hasShadow={false}
                    />
                </View>
            )}
            <View
                style={[
                    styles.text_container,
                    {
                        alignItems: centered ? 'center' : 'flex-start',
                        paddingRight: rightIcon ? 0 : 50,
                        paddingLeft: leftIcon ? 0 : centered ? 50 : 20,
                    },
                ]}
            >
                {title && <Text style={styles.main_text}>{title}</Text>}
                {subtitle && (
                    <Text style={styles.optional_text}>{subtitle}</Text>
                )}
            </View>

            {rightAction && (
                <View style={styles.right_icon}>
                    <Button
                        icon={rightIcon}
                        type="icon-button"
                        secondary
                        onClick={rightAction}
                        hasShadow={false}
                    />
                </View>
            )}
        </View>
    );
};

Header.displayName = 'Header';

export default Header;

const styles = EStyleSheet.create({
    header: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
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
        fontWeight: 'bold',
    },

    optional_text: {
        fontSize: 14,
    },

    right_icon: {
        marginRight: 10,
    },
});
