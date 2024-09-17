import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeader from '../../components/header/Header';

export const Settings: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Settings'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Settings'}>
            <CustomHeader
                firstIcon={'back'}
                firstAction={() => navigation.goBack()}
                centered
            >
                Ustawienia
            </CustomHeader>
            <Text>This is Settings</Text>
        </Layout>
    );
};
