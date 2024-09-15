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
            <Text>😘</Text>
            <Text>HOME SCREEN</Text>
            <Text>
                (to tylko tekst ale to już znak że zaczynamy działać :D)
            </Text>
            <StatusBar style="auto" />

            {users.map((user, i) => (
                <CustomButton
                    key={`user-${i}`}
                    icon="minus"
                    label={`Go to ${user} Page`}
                    onClick={() =>
                        navigation.navigate('Profile', { name: user })
                    }
                />
            ))}

            <View style={{ gap: 10 }}>
                <CustomButton
                    key={1}
                    icon="minus"
                    secondary
                    isDisabled
                    label="Usuń"
                    onClick={() => 1}
                />
                <CustomButton
                    key={12}
                    icon="minus"
                    secondary
                    isDisabled
                    label="Usuń"
                    onClick={() => 1}
                />
                <CustomButton
                    key={13}
                    icon="minus"
                    label="Usuń"
                    secondary
                    isDisabled
                    onClick={() => 1}
                />
                <CustomButton
                    key={31}
                    icon="minus"
                    label="Usuń"
                    secondary
                    isDisabled
                    onClick={() => 1}
                />
                <CustomButton
                    key={14}
                    icon="minus"
                    label="Usuń"
                    secondary
                    isDisabled
                    onClick={() => 1}
                />
            </View>
        </Layout>
    );
};
