import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeader from '../../components/header/Header';

export const Students: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Students'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Students'}>
            <CustomHeader
                firstIcon={'back'}
                firstAction={() => navigation.goBack()}
                secondIcon="settings"
                secondAction={() => navigation.navigate('Settings')}
                centered
            >
                Studenci
            </CustomHeader>
            <Text>Students list</Text>
        </Layout>
    );
};
