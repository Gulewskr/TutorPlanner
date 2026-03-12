import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, useAnimatedValue, Dimensions, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Icon, ICON_NAME } from '@components/icon';
import { NavbarNavigationScreens } from './tabs';
import { primary_shadow, window_bg } from '@styles/colors';

import { useSelector } from 'react-redux';

import { RootState, updateCurrentRoute } from '@contexts/NavbarReducer';
import { navigate } from './GlobalNavigation';
import { DEFAULT, STYLES } from '@styles/theme';

interface NavbarItemProps {
    name: NavbarNavigationScreens;
    header: string;
    icon: ICON_NAME;
    disabled?: boolean;
    size?: 'lg' | 'sm';
}

const NAVBAR_ITEMS: NavbarItemProps[] = [
    {
        name: 'Calendar',
        header: 'Kalendarz',
        icon: 'calendar',
    },
    {
        name: 'Students',
        header: 'Uczniowie',
        icon: 'students',
    },
    {
        name: 'Home',
        header: 'Home',
        icon: 'home',
    },
    {
        name: 'Payments',
        header: 'Płatności',
        icon: 'payments',
    },
    {
        name: 'Notes',
        header: 'Notatki',
        icon: 'notes',
        disabled: true,
    },
];

const ActiveItemIndicator = ({ rotateValue }: { rotateValue: Animated.Value }) => {
    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
    });

    const rotateBackwards = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg'],
    });

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 50,
                    width: '100%',
                    backgroundColor: DEFAULT.navbar.background,
                    borderTopWidth: 2,
                    borderColor: 'black',
                }}
            ></View>
            <View
                style={{
                    position: 'absolute',
                    borderRadius: 50,
                    width: 64,
                    height: 64,
                    bottom: 23,
                    backgroundColor: 'black',
                }}
            ></View>
            <Animated.View
                style={{
                    position: 'absolute',
                    borderRadius: 50,
                    width: 60,
                    height: 60,
                    bottom: 25,
                    backgroundColor: window_bg,
                    boxShadow: `5 5 1 0 #eb81ad inset`,
                    transform: [{ rotate: rotate }],
                }}
            />
            <Animated.View
                style={{
                    position: 'absolute',
                    backgroundColor: primary_shadow,
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    bottom: 30,
                    boxShadow: DEFAULT.navbar.activePageColorShadow,
                    borderWidth: DEFAULT.border.width.m,
                    borderColor: DEFAULT.border.color,
                    transform: [{ rotate: rotateBackwards }],
                }}
            />
        </>
    );
};

const Navbar: React.FC = () => {
    const previousRoute = useSelector((state: RootState) => state.previousRoute);
    const currentRoute = useSelector((state: RootState) => state.currentRoute);

    const handlePress = (route: NavbarNavigationScreens) => {
        updateCurrentRoute(route);
        navigate(route, {});
        startSpin();
        setTimeout(() => {
            stopSpin();
        }, 2000);
    };

    const rotateValue = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const startSpin = (): void => {
        rotateValue.setValue(0);

        animationRef.current = Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        );

        animationRef.current.start();
    };

    const stopSpin = (): void => {
        animationRef.current?.stop();
    };

    const screenWidth = Dimensions.get('window').width;

    const previousIndex = NAVBAR_ITEMS.findIndex(icon => icon.name === previousRoute);
    const activeIndex = NAVBAR_ITEMS.findIndex(icon => icon.name === currentRoute);

    const tileWidth = screenWidth / NAVBAR_ITEMS.length;

    const leftPanelWidth = useAnimatedValue(-tileWidth * previousIndex - tileWidth);
    const positionHorizontaly = useAnimatedValue(tileWidth * previousIndex);
    const rightPanelWidth = useAnimatedValue(tileWidth * previousIndex + tileWidth);

    Animated.timing(leftPanelWidth, {
        toValue: activeIndex * tileWidth - screenWidth,
        duration: 800,
        useNativeDriver: true,
    }).start();
    Animated.timing(positionHorizontaly, {
        toValue: tileWidth * activeIndex,
        duration: 800,
        useNativeDriver: true,
    }).start();
    Animated.timing(rightPanelWidth, {
        toValue: tileWidth * activeIndex + tileWidth,
        duration: 800,
        useNativeDriver: true,
    }).start();

    return (
        <View style={styles.navbar}>
            <Animated.View
                style={[
                    {
                        flex: 1,
                        position: 'absolute',
                        height: '100%',
                        left: 0,
                        zIndex: 0,
                        width: screenWidth,
                        transform: [{ translateX: leftPanelWidth }],
                        backgroundColor: DEFAULT.navbar.background,
                        borderTopWidth: DEFAULT.border.width.m,
                        borderColor: DEFAULT.border.color,
                    },
                ]}
            />
            <Animated.View
                style={{
                    width: '20%',
                    height: '100%',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: 0,
                    zIndex: 0,
                    transform: [{ translateX: positionHorizontaly }],
                }}
            >
                <ActiveItemIndicator rotateValue={rotateValue} />
            </Animated.View>
            <Animated.View
                style={{
                    flex: 1,
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: DEFAULT.navbar.background,
                    borderTopWidth: DEFAULT.border.width.m,
                    borderColor: DEFAULT.border.color,
                    right: 0,
                    zIndex: 0,
                    width: screenWidth,
                    transform: [{ translateX: rightPanelWidth }],
                }}
            />
            {NAVBAR_ITEMS.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    disabled={item.disabled}
                    onPress={() => !item.disabled && handlePress(item.name)}
                    style={styles.navbarItem}
                >
                    <View
                        key={index}
                        style={[
                            {
                                width: '100%',
                                height: 50,
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bottom:
                                    activeIndex === index ? 30 : previousIndex === index ? 0 : 0,
                            },
                            item.disabled && styles.disabled,
                        ]}
                    >
                        <Icon icon={item.icon} size={item.size ? 'md' : 'sm'} />
                        {activeIndex !== index && (
                            <Text style={STYLES.text_styles.boldbody}>{item.header}</Text>
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

Navbar.displayName = 'GlobalNavbar';

const styles = EStyleSheet.create({
    navbar: {
        alignItems: 'center',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 100,
        bottom: 0,
        position: 'absolute',
    },
    navbarItem: {
        flex: 1,
        alignContent: 'center',
        height: 50,
        zIndex: 9999,
        margin: 0,
        padding: 0,
    },
    disabled: {
        backgroundColor: DEFAULT.navbar.disabledColor,
        opacity: 0.5,
    },
});

export default Navbar;
