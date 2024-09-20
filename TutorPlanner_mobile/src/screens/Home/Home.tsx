import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@components/Button';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Header } from '@components/Header';

export const Home: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation, route }) => {
    const users = ['OLA P', 'KAMIL S'];

    return (
        <Layout navigation={navigation} route={'Home'}>
            <StatusBar style="auto" />

            <Header
                optionalText={'Dziś jest wspaniały dzień do działania :)'}
                secondIcon="settings"
                secondAction={() => navigation.navigate('Settings')}
            >
                Witaj, Natalcia!
            </Header>

            <View style={styles.double_button_container}>
                <Button
                    icon="addLesson"
                    onClick={() => 1}
                    label="Dodaj zajęcia"
                />
                <Button
                    icon="addStudent"
                    onClick={() => 1}
                    label="Dodaj ucznia"
                />
            </View>

            <View style={styles.double_button_container}>
                <Button
                    icon="addPayment"
                    onClick={() => 1}
                    label="Dodaj płatność"
                />
                <Button icon="notes" onClick={() => 1} label="Dodaj notatkę" />
            </View>

            {/* {users.map((user, i) => (
                <CustomButton
                    key={`user-${i}`}
                    icon="minus"
                    label={`Go to ${user} Page`}
                    onClick={() =>
                        navigation.navigate('Profile', { name: user })
                    }
                />
            ))} */}
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
    },
});
