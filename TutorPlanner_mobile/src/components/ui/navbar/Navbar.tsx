import React from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    useAnimatedValue,
    Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Svg, Defs, Rect, Mask, Circle } from 'react-native-svg';
import { Icon, ICON_NAME } from '@components/icon';
import { NavbarNavigationScreens } from './tabs';
import { $bgColor_primary, $color_active_page, $color_black } from '@styles/colors';
import { $border_width } from '@styles/global';

import { useSelector } from 'react-redux';

//import Animated from 'react-native-reanimated';
import { RootState, updateCurrentRoute } from '@contexts/NavbarReducer';
import { navigate } from './GlobalNavigation';

interface NavbarItemProps {
    name: NavbarNavigationScreens;
    icon: ICON_NAME;
    disabled?: boolean;
    size?: 'lg' | 'sm';
}

const NAVBAR_ITEMS: NavbarItemProps[] = [
    {
        name: 'Calendar',
        icon: 'calendar',
    },
    {
        name: 'Students',
        icon: 'students',
    },
    {
        name: 'Home',
        icon: 'home',
    },
    {
        name: 'Payments',
        icon: 'payments',
    },
    {
        name: 'Notes',
        icon: 'notes',
        disabled: true,
    },
];

const ActiveComponent = () => (
    <Svg
        style={{
            position: 'absolute',
            top: -0.5,
        }}
        height="100%"
        width="100%"
        viewBox="0 0 130 90"
        preserveAspectRatio="none"
    >
        <Defs>
            <Mask id="mask" x="0" y="0" height="100" width="200">
                <Rect height="100%" width="100%" fill="#fff" />
                <Circle r="50" cx="50%" cy="0" />
            </Mask>
        </Defs>
        <Rect
            x="0"
            y="-0"
            height="3"
            width="130"
            fill={$color_black}
            mask="url(#mask)"
        />
        <Rect
            x="0"
            y="3"
            height="100"
            width="130"
            fill={$bgColor_primary}
            mask="url(#mask)"
            fill-opacity="0"
        />
        <Circle r="53" cx="50%" cy="0" mask="url(#mask)" fill={$color_black} />
    </Svg>
);

const Navbar: React.FC = () => {
    const previousRoute = useSelector(
        (state: RootState) => state.previousRoute,
    );
    const currentRoute = useSelector((state: RootState) => state.currentRoute);

    const handlePress = (route: NavbarNavigationScreens) => {
        updateCurrentRoute(route);
        navigate(route, {});
    };

    const screenWidth = Dimensions.get('window').width;

    const previousIndex = NAVBAR_ITEMS.findIndex(
        icon => icon.name === previousRoute,
    );
    const activeIndex = NAVBAR_ITEMS.findIndex(
        icon => icon.name === currentRoute,
    );

    const tileWidth = screenWidth / NAVBAR_ITEMS.length;

    const leftPanelWidth = useAnimatedValue(
        -tileWidth * previousIndex - tileWidth,
    );
    const positionHorizontaly = useAnimatedValue(tileWidth * previousIndex);
    const rightPanelWidth = useAnimatedValue(
        tileWidth * previousIndex + tileWidth,
    );

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
                style={{
                    flex: 1,
                    position: 'absolute',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: 0,
                    zIndex: 0,
                    width: screenWidth,
                    transform: [{ translateX: leftPanelWidth }],
                    backgroundColor: $bgColor_primary,
                    borderTopWidth: $border_width,
                    borderColor: $color_black,
                }}
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
                <View style={styles.activeIconContainer} />
                <ActiveComponent />
            </Animated.View>
            <Animated.View
                style={{
                    flex: 1,
                    position: 'absolute',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: $bgColor_primary,
                    borderTopWidth: $border_width,
                    borderColor: $color_black,
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
                style={[
                    styles.navbarItem,
                    {
                        alignContent: 'center',
                        height: 100,
                        zIndex: 9999,
                    },
                ]}
            >
                <View
                    key={index}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: activeIndex === index
                        ? -30
                        : previousIndex === index
                          ? 0
                          : 0,
                    }}
                >
                    <Icon icon={item.icon} size={item.size ? 'md' : 'sm'} />
                </View>
                {item.disabled && (
                    <View style={styles.navbarItemBG_disabled} />
                )}
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
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 100,
        bottom: 0,
        position: 'absolute',
    },
    navbarItem: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbarItemBG_disabled: {
        backgroundColor: '$color_disabled_primary',
        opacity: 0.5,
        position: 'absolute',
        width: '100%',
        height: 56,
    },
    activeIconContainer: {
        backgroundColor: $color_active_page,
        borderRadius: 50,
        width: 50,
        height: 50,
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: $border_width,
        borderColor: $color_black,
    },
});

export default Navbar;
