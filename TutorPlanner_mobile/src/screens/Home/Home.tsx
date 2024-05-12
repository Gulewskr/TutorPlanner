import * as React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './Home.scss';
import { StatusBar } from 'expo-status-bar';

export const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
    const users = ['OLA P', 'KAMIL S'];

    return (
        <View style={styles.container}>
            <Text>😘</Text>
            <Text>HOME SCREEN</Text>
            <Text>
                (to tylko tekst ale to już znak że zaczynamy działać :D)
            </Text>
            <StatusBar style="auto" />
            {users.map((user, i) => (
                <Button
                    key={`user-${i}`}
                    title={`Go to ${user} Page`}
                    onPress={() =>
                        navigation.navigate('Profile', { name: user })
                    }
                />
            ))}
        </View>
    );
};
