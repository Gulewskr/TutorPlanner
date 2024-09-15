import { View } from 'react-native';
import { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navbar from '../components/navbar/Navbar';
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
                //colors={['red', 'black']}
                style={styles.background}
                start={{ x: 0.55, y: 0.2 }}
                end={{ x: 1, y: 0.7 }}
            />
            {children}
            <Navbar navigation={navigation} route={route} />
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        zIndex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
    },
});
