import { View, StyleSheet } from 'react-native';
import { Button } from '@components/button';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Header } from '@components/header';
import { EventWrapper } from '@components/events';

export const Home: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Home'}
            hasHeader
            isHeaderCentered={false}
            title="Witaj, Natalcia!"
            subtitle="Dziś jest wspaniały dzień do działania :)"
        >
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
                            onClick={() => navigation.navigate('CreateStudent')}
                            label="Dodaj ucznia"
                            width={160}
                        />
                    </View>
                </View>
                <View style={styles.double_button_container}>
                    <View style={{ width: '50%' }}>
                        <Button
                            icon="addPayment"
                            onClick={() => navigation.navigate('CreatePayment')}
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
            <EventWrapper day={new Date(2024, 8, 11)} />
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
