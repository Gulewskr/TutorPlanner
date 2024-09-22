import { View } from 'react-native';
import { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navbar } from '@components/navbar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavbarNavigationScreens } from '../App';
import { Header } from '@components/header';

interface LayoutProps {
    navigation: NativeStackNavigationProp<any>;
    route: NavbarNavigationScreens;
    hasHeader?: boolean;
    isHeaderCentered?: boolean;
    title?: string;
    subtitle?: string;
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
    children,
    navigation,
    hasHeader,
    isHeaderCentered = true,
    route,
    title,
    subtitle,
}) => {
    const isBackButtonDisabled = !navigation.canGoBack();
    const isSettingsButtonDisabled = route == 'Settings';

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFC3FF', '#FFFCE3']}
                style={styles.backgroundGradient}
                start={{ x: 0.55, y: 0.2 }}
                end={{ x: 1, y: 0.7 }}
            />
            {hasHeader && (
                <View style={styles.header_container}>
                    <Header
                        leftIcon={isBackButtonDisabled ? undefined : 'back'}
                        leftAction={
                            isBackButtonDisabled
                                ? undefined
                                : () => navigation.goBack()
                        }
                        rightIcon={
                            isSettingsButtonDisabled ? undefined : 'settings'
                        }
                        rightAction={
                            isSettingsButtonDisabled
                                ? undefined
                                : () => navigation.navigate('Settings')
                        }
                        title={title}
                        subtitle={subtitle}
                        isCentered={isHeaderCentered}
                    />
                </View>
            )}
            <View
                style={[
                    styles.content,
                    {
                        marginTop: hasHeader ? 90 : 0,
                    },
                ]}
            >
                {children}
            </View>
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
    container: {
        zIndex: 1,
        paddingTop: 15,
        backgroundColor: 'red',
        height: '100%',
        position: 'relative',
    },
    header_container: {
        position: 'absolute',
        paddingTop: 30,
        top: 0,
        width: '100%',
        height: 90,
    },
    navbar: {
        position: 'absolute',
        bottom: -2,
        left: 0,
        width: '100%',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        alignItems: 'center',
    },
});
