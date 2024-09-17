import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavbarNavigationScreens, RootStackParamList } from '../../App';
import { Icon, ICON_NAME } from '../icon/Icon';

interface IconProps {
    name: NavbarNavigationScreens;
    icon: ICON_NAME;
}

interface NavbarProps {
    navigation: NativeStackNavigationProp<RootStackParamList>;
    route: NavbarNavigationScreens;
}

const Navbar: React.FC<NavbarProps> = ({ navigation, route }) => {
    const icons: IconProps[] = [
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

    const handlePress = (route: NavbarNavigationScreens) => {
        navigation.navigate(route);
    };

    return (
        <View style={styles.navbar}>
            {icons.map((icon, index) => {
                const isActive = route === icon.name;
                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        onPress={() => handlePress(icon.name)}
                        style={[
                            styles.navbarItem,
                            isActive && styles.navbarItem__active,
                        ]}
                    >
                        {isActive ? (
                            <>
                                <View
                                    style={styles.navbarItem__active_border}
                                />
                                <View
                                    style={
                                        styles.navbarItem__active_border_after
                                    }
                                />
                                <View style={styles.activeIconContainer}>
                                    <Icon icon={icon.icon} size={'sm'} />
                                </View>
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
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 56,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '$colorBlack',
        backgroundColor: '$backgroundColorPrimary',
        border: '1px solid $colorBlack',
    },
    navbarItem: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbarItem__active: {
        // backgroundColor: '$backgroundColorWhite',
        width: '100%',
        aspectRatio: 1,
        borderRadius: 50,
        borderStartColor: 'white',
        top: -28,
    },
    navbarItem__active_border: {
        position: 'absolute',
        top: 36,
        left: 0,
        width: '100%',
        height: '50%',
        aspectRatio: 1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderWidth: 1,
        borderColor: '$colorBlack',
        borderStartColor: 'white',
    },
    navbarItem__active_border_after: {
        position: 'absolute',
        top: 35,
        left: 1,
        width: '97%',
        height: '50%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: '$backgroundColorWhite',
    },
    activeIconContainer: {
        backgroundColor: '$colorPrimary',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        border: '0.5px solid $colorBlack',
        borderWidth: 1,
        borderColor: '$colorBlack',
    },
});

export default Navbar;
