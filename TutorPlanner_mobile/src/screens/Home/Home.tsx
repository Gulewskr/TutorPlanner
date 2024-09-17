import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/button/Button';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export const Home: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Home'>
> = ({ navigation, route }) => {
    const users = ['OLA P', 'KAMIL S'];

    return (
        <Layout navigation={navigation} route={'Home'}>
            <StatusBar style="auto" />

            <View style={styles.double_button_container}>
                <CustomButton
                    icon="addLesson"
                    onClick={() => 1}
                    label="Dodaj zajęcia"
                />
                <CustomButton
                    icon="addStudent"
                    onClick={() => 1}
                    label="Dodaj ucznia"
                />
            </View>

            <View style={styles.double_button_container}>
                <CustomButton
                    icon="addPayment"
                    onClick={() => 1}
                    label="Dodaj płatność"
                />
                <CustomButton
                    icon="notes"
                    onClick={() => 1}
                    label="Dodaj notatkę"
                />
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
