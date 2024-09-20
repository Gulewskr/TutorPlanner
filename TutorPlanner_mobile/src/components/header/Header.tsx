import React from 'react';
import { View, Text, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ICON_NAME } from '../Icon/Icon';
import { Button } from '@components/Button';

interface HeaderProps {
    firstIcon?: ICON_NAME;
    firstAction?: () => void;
    optionalText?: string;
    secondIcon?: ICON_NAME;
    secondAction?: () => void;
    centered?: boolean;
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
    firstIcon,
    firstAction,
    optionalText,
    secondIcon,
    secondAction,
    centered = false,
    children,
}) => {
    return (
        <View style={styles.header_container}>
            <View style={styles.header}>
                {firstAction && (
                    <Pressable style={styles.first_icon} onPress={firstAction}>
                        <Button
                            icon={firstIcon}
                            type="icon-button"
                            secondary
                            onClick={firstAction}
                        />
                    </Pressable>
                )}

                <View
                    style={[
                        styles.text_container,
                        {
                            alignItems: centered ? 'center' : 'flex-start',
                            paddingRight: secondIcon ? 0 : 50,
                            paddingLeft: firstIcon ? 0 : centered ? 50 : 20,
                        },
                    ]}
                >
                    <Text style={styles.main_text}>{children}</Text>
                    {optionalText && (
                        <Text style={styles.optional_text}>{optionalText}</Text>
                    )}
                </View>

                {secondAction && (
                    <Pressable
                        style={styles.second_icon}
                        onPress={secondAction}
                    >
                        <Button
                            icon={secondIcon}
                            type="icon-button"
                            secondary
                            onClick={secondAction}
                        />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

Header.displayName = 'Header';

export default Header;

const styles = EStyleSheet.create({
    header_container: {
        position: 'absolute',
        paddingTop: 15,
        top: 0,
        width: '100%',
    },

    header: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },

    first_icon: {
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

    second_icon: {
        marginRight: 10,
    },
});
