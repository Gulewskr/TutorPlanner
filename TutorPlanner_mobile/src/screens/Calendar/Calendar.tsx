import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeader from '../../components/header/Header';
import React from 'react';

export const Calendar: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Calendar'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Calendar'}>
            <CustomHeader
                firstIcon={'back'}
                firstAction={() => navigation.goBack()}
                secondIcon="settings"
                secondAction={() => navigation.navigate('Settings')}
                centered
            >
                Kalendarz
            </CustomHeader>
            <Text>This is calendar</Text>
        </Layout>
    );
};
