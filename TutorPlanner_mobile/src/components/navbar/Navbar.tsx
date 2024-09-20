import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Defs, Rect, Mask, Circle, Line } from 'react-native-svg';
import { NavbarNavigationScreens, RootStackParamList } from '../../App';
import { Icon, ICON_NAME } from '@components/Icon';

interface NavbarItemProps {
    name: NavbarNavigationScreens;
    icon: ICON_NAME;
}

interface NavbarProps {
    navigation: NativeStackNavigationProp<RootStackParamList>;
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
    },
];

const ActiveComponent = () => (
    <Svg
        style={{
            position: 'absolute',
            top: -1,
            left: 0,
        }}
        x={0}
        y={0}
        height="100%"
        width="100%"
        viewBox="0 0 100 70"
    >
        <Defs>
            <Mask id="mask" x="0" y="0" height="120" width="100">
                <Rect height="100%" width="100%" fill="#fff" />
                <Circle r="45" cx="50%" cy="0" />
            </Mask>
        </Defs>
        <Rect
            x="0"
            y="0"
            height="100%"
            width="100%"
            fill="#FFC3FF" //$backgroundColorPrimary
            mask="url(#mask)"
            fill-opacity="0"
        />
        <Circle
            r="46.5"
            cx="50%"
            cy="0"
            mask="url(#mask)"
            fill="#070707" //$colorBlack
        />
        <Line
            x1={0}
            x2={100}
            y1="0.5"
            y2="0.5"
            mask="url(#mask)"
            stroke="#070707" //$colorBlack
            strokeWidth="1.5"
        />
    </Svg>
);

const Navbar: React.FC<NavbarProps> = ({ navigation, route }) => {
    const handlePress = (route: NavbarNavigationScreens) => {
        navigation.navigate(route);
    };

    const activeIndex = useMemo(() => {
        return NAVBAR_ITEMS.findIndex(icon => icon.name === route);
    }, [route]);

    return (
        <View style={styles.navbar}>
            {NAVBAR_ITEMS.map((icon, index) => {
                const isActive = activeIndex === index;
                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        onPress={() => handlePress(icon.name)}
                        style={[
                            styles.navbarItem,
                            isActive || styles.navbarItemBG,
                        ]}
                    >
                        {isActive ? (
                            <>
                                <View style={styles.activeIconContainer}>
                                    <Icon icon={icon.icon} size={'sm'} />
                                </View>
                                <ActiveComponent />
                            </>
                        ) : (
                            <Icon icon={icon.icon} />
                        )}
                    </TouchableOpacity>
                );
            })}
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
        border: '1px solid $colorBlack',
    },
    navbarItem: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbarItemBG: {
        borderTopWidth: 1,
        backgroundColor: '$backgroundColorPrimary',
    },
    activeIconContainer: {
        backgroundColor: '$colorPrimary',
        borderRadius: 50,
        width: 50,
        height: 50,
        top: -28,
        justifyContent: 'center',
        alignItems: 'center',
        border: '0.5px solid $colorBlack',
        borderWidth: 1,
        borderColor: '$colorBlack',
    },
});

export default Navbar;
