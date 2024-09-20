import { View, ScrollView } from 'react-native';
import { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navbar } from '@components/Navbar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavbarNavigationScreens, RootStackParamList } from '../App';

interface LayoutProps {
    navigation: NativeStackNavigationProp<RootStackParamList, any, any>;
    route: NavbarNavigationScreens;
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
    children,
    navigation,
    route,
}) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFC3FF', '#FFFCE3']}
                style={styles.backgroundGradient}
                start={{ x: 0.55, y: 0.2 }}
                end={{ x: 1, y: 0.7 }}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {children}
            </ScrollView>
            <LinearGradient
                colors={['transparent', 'rgba(255, 252, 227, .9)', '#FFFCE3']}
                style={styles.bottomGradient}
                start={{ x: 0.5, y: 0.3 }}
                end={{ x: 0.5, y: 1 }}
            />
            <View style={styles.navbar}>
                <Navbar navigation={navigation} route={route} />
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: 'red',
        height: '100%',
        position: 'relative',
    },
    navbar: {
        position: 'absolute',
        bottom: -2,
        left: 0,
        width: '100%',
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
    },
    bottomGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '20%',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
