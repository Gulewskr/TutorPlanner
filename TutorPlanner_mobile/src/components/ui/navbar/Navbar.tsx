import React, { useEffect, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    useAnimatedValue,
    Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Defs, Rect, Mask, Circle } from 'react-native-svg';
import { Icon, ICON_NAME } from '@components/icon';
import { NavbarNavigationScreens } from './tabs';
import { $bgColor_primary, $color_black } from '@styles/colors';
import { $border_width } from '@styles/global';
import { useGlobalContext } from '@contexts/GlobalContext';

interface NavbarItemProps {
    name: NavbarNavigationScreens;
    icon: ICON_NAME;
    disabled?: boolean;
    size?: 'lg' | 'sm';
}

interface NavbarProps {
    navigation: NativeStackNavigationProp<any>;
    route: NavbarNavigationScreens;
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

const Navbar: React.FC<NavbarProps> = ({ navigation, route }) => {
    const handlePress = (route: NavbarNavigationScreens) => {
        navigation.navigate(route, { previousScreen: route });
    };

    const screenWidth = Dimensions.get('window').width;

    const { previousScreen, setPreviousScreen } = useGlobalContext();
    
    useEffect(() => {
        setPreviousScreen(route);
        const intervalId = setInterval(() => {
            setPreviousScreen(route);
          }, 1000);
          return () => clearInterval(intervalId);
    }, []);

    const previousIndex = useMemo(() => {
        return NAVBAR_ITEMS.findIndex(icon => icon.name === previousScreen);
    }, [route]);

    const activeIndex = useMemo(() => {
        return NAVBAR_ITEMS.findIndex(icon => icon.name === route);
    }, [route]);

    const tileWidth = screenWidth / NAVBAR_ITEMS.length;
    const leftPanelWidth = useAnimatedValue(
        -tileWidth * previousIndex - tileWidth,
    );
    const positionHorizontaly = useAnimatedValue(tileWidth * previousIndex);
    const rightPanelWidth = useAnimatedValue(
        tileWidth * previousIndex + tileWidth,
    );
    const bringUpIcon = useAnimatedValue(0);
    const bringDownIcon = useAnimatedValue(-30);

    useEffect(() => {
        Animated.timing(leftPanelWidth, {
            toValue: activeIndex * tileWidth - screenWidth,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(positionHorizontaly, {
            toValue: tileWidth * activeIndex,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(rightPanelWidth, {
            toValue: tileWidth * activeIndex + tileWidth,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(bringUpIcon, {
            toValue: -30,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(bringDownIcon, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [positionHorizontaly, rightPanelWidth, activeIndex, bringUpIcon, bringDownIcon]);

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
                        },
                    ]}
                >
                    {activeIndex === index ? (
                        <Animated.View
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: 0,
                                transform: [{ translateY: bringUpIcon }],
                            }}
                        >
                            <Icon
                                icon={item.icon}
                                size={item.size ? 'md' : 'sm'}
                            />
                        </Animated.View>
                    ) : previousIndex === index ? (
                        <Animated.View
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: [{ translateY: bringDownIcon }],
                            }}
                        >
                            <Icon
                                icon={item.icon}
                                size={item.size ? 'md' : 'sm'}
                            />
                        </Animated.View>
                    ) : (
                        <Icon icon={item.icon} size={item.size} />
                    )}
                    {item.disabled && (
                        <View style={styles.navbarItemBG_disabled} />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

Navbar.displayName = 'Navbar';

const styles = EStyleSheet.create({
    navbar: {
        alignItems: 'center',
        width: '100%',
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        height: '100%',
    },
    activeIconContainer: {
        backgroundColor: '$color_primary',
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
