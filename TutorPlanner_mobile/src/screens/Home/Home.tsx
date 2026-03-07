import { View, StyleSheet } from 'react-native';
import { Button } from '@components-new/button';
import { Layout } from '../Layout';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Header } from '@components-new/header';
import { EventsList } from '@components/complex/eventslist';
import { ScrollView } from '@components/ui/scrool-view';
import { NavbarNavigationScreens, RootStackParamList } from '@components/ui/navbar';
import { useEffect, useMemo } from 'react';
import { useConfig } from '@hooks/useConfig';
import { useModalContext } from '@contexts/modalContext';
import { AppVersionModal } from '@components/modals/AppVersionModal';
import { useAlert } from '@contexts/AlertContext';
import { setLoadingPage, setLoadingScreen, updateCurrentRoute } from '@contexts/NavbarReducer';
import { APP_VERSION } from '../../config';
import { Columns } from '@components-new/view';

export const Home: React.FC<
    BottomTabScreenProps<RootStackParamList, 'Home'>
> = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const { setIsOpen, setModalBody } = useModalContext();
    const { showAlert } = useAlert();
    const { versionCheck, welcomeMessage, isLoading } = useConfig();
    const today = useMemo(() => new Date(), []);

    useFocusEffect(() => {
        updateCurrentRoute('Home' as NavbarNavigationScreens)
    });

    useEffect(() => {
        if (!versionCheck) {
            if (!isLoading) {
                showAlert({
                    message: 'Oj coś nie działa 🤒',
                    severity: 'warning',
                });
            }
            return;
        }
        if (!versionCheck.isSupported) {
            setModalBody(
                <AppVersionModal
                    message={`Należy pobrać aktualizacje aplikacji - najnowsza wersja: ${versionCheck.newestVersion}, aktualna wersja może nie działać poprawnie 😟`}
                    version={APP_VERSION}
                />,
            );
            setIsOpen(true);
            return;
        }
        if (versionCheck.hasUpdate) {
            setModalBody(
                <AppVersionModal
                    message={`Dostępna aktualizacja - ${versionCheck.newestVersion} 😉`}
                    version={APP_VERSION}
                />,
            );
            setIsOpen(true);
            return;
        }
        if (!isLoading) {
            showAlert({
                message: 'Miłej pracy 😎',
                severity: 'success',
            });
        }
        return;
    }, [versionCheck]);

    if (isFocused && !isLoading) {
        setTimeout(() => {
            setLoadingScreen(false);
            setLoadingPage(false);
        }, 1500);
    }

    return (
        <Layout
            navigation={navigation}
            route={'Home'}
            hasHeader
            isHeaderCentered={false}
            title={welcomeMessage.title}
            subtitle={welcomeMessage.message}
        >
            {isFocused && (
                <ScrollView>
                    <View style={styles.controlPanel}>
                        <Columns columns={2} gap={10}>
                            <Button
                                icon="addStudent"
                                onClick={() =>
                                    navigation.navigate('Students', {
                                        screen: 'Create',
                                        initial: true,
                                    })
                                }
                                label="Dodaj ucznia"
                            />
                            <Button
                                icon="addPayment"
                                onClick={() =>
                                    navigation.navigate('CreatePayment')
                                }
                                label="Dodaj płatność"
                            />
                            <Button
                                icon="addLesson"
                                onClick={() =>
                                    navigation.navigate('Lessons', {
                                        screen: 'Create',
                                        initial: true,
                                    })
                                }
                                label="Dodaj zajęcia"
                            />
                            <Button
                                icon='event'
                                onClick={() =>
                                    navigation.navigate('Events', {
                                        screen: 'Create',
                                        initial: true,
                                    })
                                }
                                label="Dodaj wydarzenie"
                            />
                        </Columns>
                    </View>
                    <Header
                        rightIcon={'addLesson'}
                        rightAction={() => 1}
                        title={'Dzisiejszy plan'}
                        noBackground
                    />
                    <EventsList day={today} navigation={navigation} />
                </ScrollView>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    controlPanel: {
        gap: 15,
        padding: 15,
        paddingVertical: 10,
    },
});
