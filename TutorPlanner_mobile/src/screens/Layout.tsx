import { KeyboardAvoidingView, View } from 'react-native';
import { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavbarNavigationScreens } from '@components/ui/navbar';
import { Header } from '@components-new/header';
import React from 'react';
import { useAlert } from '@contexts/AlertContext';
import { old_primary, window_bg } from '@styles/colors';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

interface LayoutProps {
    navigation: BottomTabNavigationProp<any>;
    route?: NavbarNavigationScreens;
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
    const { alerts } = useAlert();
    const isSettingsButtonDisabled = route == 'Settings';

    return (
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
                colors={[window_bg, old_primary]}
                style={styles.backgroundGradient}
                start={{ x: 0.4, y: 0.4 }}
                end={{ x: 0.7, y: 0.8 }}
            />
            {hasHeader && (
                <View style={styles.header_container}>
                    <Header
                        leftIcon={'back'}
                        leftAction={navigation.goBack}
                        isLeftActionDisabled={!navigation.canGoBack()}
                        rightIcon={isSettingsButtonDisabled ? undefined : 'settings'}
                        rightAction={
                            isSettingsButtonDisabled
                                ? undefined
                                : () => navigation.navigate('Settings')
                        }
                        title={title}
                        subtitle={subtitle}
                        isCentered={isHeaderCentered}
                        titleFontSize={26}
                    />
                </View>
            )}
            <KeyboardAvoidingView style={styles.content} behavior="padding">
                {children}
            </KeyboardAvoidingView>
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
    container: {
        zIndex: 1,
        height: 500,
        position: 'relative',
        flex: 1,
        backgroundColor: 'red',
    },
    header_container: {
        position: 'fixed',
        top: 0,
        width: '100%',
        fontFamily: 'Modak_400Regular',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        alignItems: 'center',
        marginBottom: 100,
    },
});
