import React from 'react';
import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavbarNavigationScreens, RootStackParamList } from '../../App';
import { Icon } from '../icon/Icon';
import CustomButton from '../button/Button';

interface HeaderProps {
    navigation: NativeStackNavigationProp<RootStackParamList, any, any>;
    route: NavbarNavigationScreens;
}

const CustomHeader: React.FC<HeaderProps> = ({ navigation, route }) => {
    const isHome = route === 'Home';

    type ROUTE_NAME =
        | 'Payments'
        | 'Calendar'
        | 'Students'
        | 'Profile'
        | 'Home'
        | 'Notes'
        | 'Settings';

    const titleMap: { [key in ROUTE_NAME]: string } = {
        Payments: 'Płatności',
        Calendar: 'Kalendarz',
        Students: 'Studenci',
        Profile: 'Profil',
        Home: 'Strona główna',
        Notes: 'Notatki',
        Settings: 'Ustawienia',
    };
    return (
        <View style={styles.header}>
            {isHome || (
                <Pressable
                    style={styles.go_back}
                    onPress={() => navigation.goBack()}
                >
                    <Icon icon={'back'} size="sm" />
                </Pressable>
            )}

            <View
                style={[
                    styles.text_container,
                    { alignItems: isHome ? '' : 'center' },
                ]}
            >
                <Text style={styles.main_text}>
                    {isHome ? 'Witaj, Natalcia!' : titleMap[route]}
                </Text>
                {isHome && (
                    <Text style={styles.optional_text}>
                        Dziś jest wspaniały dzień do działania :)
                    </Text>
                )}
            </View>

            <Pressable
                style={styles.options}
                onPress={() => navigation.goBack()}
            >
                <CustomButton
                    icon="settings"
                    type="icon-button"
                    secondary
                    onClick={() => navigation.navigate('Settings')}
                />
            </Pressable>
        </View>
    );
};

CustomHeader.displayName = 'Header';

export default CustomHeader;

const styles = EStyleSheet.create({
    header: {
        height: 100,
        paddingTop: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },

    go_back: {
        marginLeft: 10,
    },

    text_container: {
        width: '70%',
        marginLeft: 20,
        display: 'flex',
    },

    main_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    optional_text: {
        fontSize: 14,
    },

    options: {
        marginRight: 10,
    },
});
