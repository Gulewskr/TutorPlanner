import { View } from 'react-native';
import { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navbar, NavbarNavigationScreens } from '@components/ui/navbar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '@components/header';
import React from 'react';
import { useAlert } from '@contexts/AlertContext';

interface LayoutProps {
    navigation: NativeStackNavigationProp<any>;
    route: NavbarNavigationScreens;
    hasHeader?: boolean;
    hasHeaderSeperated?: boolean;
    isHeaderCentered?: boolean;
    title?: string;
    subtitle?: string;
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
    children,
    navigation,
    hasHeader,
    hasHeaderSeperated,
    isHeaderCentered = true,
    route,
    title,
    subtitle,
}) => {
    const { alerts } = useAlert();
    const isSettingsButtonDisabled = route == 'Settings';

    return (
        <>
            <View style={styles.container}>
                {alerts && (
                    <View
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 40,
                            width: '70%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            gap: 10,
                            zIndex: 1000,
                        }}
                        pointerEvents="box-none"
                    >
                        {alerts.map(alert => alert)}
                    </View>
                )}
                <LinearGradient
                    colors={['#FFC3FF', '#FFFCE3']}
                    style={styles.backgroundGradient}
                    start={{ x: 0.55, y: 0.2 }}
                    end={{ x: 1, y: 0.7 }}
                />
                {hasHeader && (
                    <>
                        <View style={styles.header_container}>
                            <Header
                                leftIcon={'back'}
                                leftAction={navigation.goBack}
                                isLeftActionDisabled={!navigation.canGoBack()}
                                rightIcon={
                                    isSettingsButtonDisabled
                                        ? undefined
                                        : 'settings'
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
                    </>
                )}
                {/* //TODO - add top gradient
            <LinearGradient
                colors={['transparent', 'rgba(255, 252, 227, .9)', '#FFFCE3']}
                style={styles.topGradient}
                start={{ x: 0.5, y: 0.3 }}
                end={{ x: 0.5, y: 1 }}
                pointerEvents="none"
            />
            */}
                <View
                    style={[
                        styles.content,
                        {
                            marginTop: hasHeader ? 90 : 0,
                        },
                    ]}
                >
                    {hasHeaderSeperated && <View style={styles.verticalLine} />}
                    {children}
                </View>
                <LinearGradient
                    colors={[
                        'transparent',
                        'rgba(255, 252, 227, .9)',
                        '#FFFCE3',
                    ]}
                    style={styles.bottomGradient}
                    start={{ x: 0.5, y: 0.3 }}
                    end={{ x: 0.5, y: 1 }}
                    pointerEvents="none"
                />
                <View style={styles.navbar}>
                    <Navbar navigation={navigation} route={route} />
                </View>
            </View>
        </>
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
    topGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '20%',
    },
    container: {
        zIndex: 1,
        paddingTop: 15,
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
    verticalLine: {
        width: '100%',
        borderWidth: 0.5,
        height: 1,
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
