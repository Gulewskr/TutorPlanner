import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '@components/Header';

export const Students: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Students'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Students'}>
            <Header
                firstIcon={'back'}
                firstAction={() => navigation.goBack()}
                secondIcon="settings"
                secondAction={() => navigation.navigate('Settings')}
                centered
            >
                Studenci
            </Header>
            <Text>Students list</Text>
        </Layout>
    );
};
