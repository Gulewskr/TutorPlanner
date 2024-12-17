import { View, StyleSheet } from 'react-native';
import { Button } from '@components/button';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { Header } from '@components/header';
import { EventsList } from '@components/complex/eventslist';
import { ScrollView } from '@components/ui/scrool-view';
import { RootStackParamList } from '@components/ui/navbar';
import { useEffect, useMemo, useState } from 'react';
import { useConfig } from '@hooks/useConfig';
import { useModalContext } from '@contexts/modalContext';
import { AppVersionModal } from '@components/modals/AppVersionModal';
import { APP_VERSION } from 'src/config';
import { useAlert } from '@contexts/AlertContext';

export const Home: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation, route }) => {
    const [loadingScreen, setLoadingScreen] = useState(true);
    const isFocused = useIsFocused();
    const { setIsOpen, setModalBody } = useModalContext();
    const { showAlert } = useAlert();
    const { versionCheck, welcomeMessage, isLoading } = useConfig();
    const today = useMemo(() => new Date(), []);

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

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => setLoadingScreen(false), 1500);
        }
    }, [isLoading]);

    return (
        <Layout
            navigation={navigation}
            route={'Home'}
            hasHeader
            isHeaderCentered={false}
            title={welcomeMessage.title}
            subtitle={welcomeMessage.message}
            isLoading={loadingScreen}
        >
            {isFocused && (
                <ScrollView>
                    <View style={styles.controlPanel}>
                        <View style={styles.double_button_container}>
                            <View style={{ width: '50%' }}>
                                <Button
                                    icon="addLesson"
                                    onClick={() =>
                                        navigation.navigate('Lessons', {
                                            screen: 'Create',
                                            initial: true,
                                        })
                                    }
                                    label="Dodaj zajęcia"
                                    width={160}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Button
                                    icon="addStudent"
                                    onClick={() =>
                                        navigation.navigate('Students', {
                                            screen: 'Create',
                                            initial: true,
                                        })
                                    }
                                    label="Dodaj ucznia"
                                    width={160}
                                />
                            </View>
                        </View>
                        <View style={styles.double_button_container}>
                            <View style={{ width: '50%' }}>
                                <Button
                                    icon="addPayment"
                                    onClick={() =>
                                        navigation.navigate('CreatePayment')
                                    }
                                    label="Dodaj płatność"
                                    width={160}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Button
                                    icon="notes"
                                    onClick={() => 1}
                                    label="Dodaj notatkę"
                                    disabled={true}
                                    width={160}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.timeline}>
                        <Header
                            rightIcon={'addLesson'}
                            rightAction={() => 1}
                            title={'Dzisiejszy plan'}
                        />
                    </View>
                    <EventsList day={today} navigation={navigation} />
                </ScrollView>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    double_button_container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
        paddingHorizontal: 15,
    },
    controlPanel: {
        gap: 5,
    },
    timeline: {},
});
