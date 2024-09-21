import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Header } from '@components/Header';

export const Calendar: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Calendar'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Calendar'}
            title="Kalendarz"
            hasHeader
        >
            <Text>This is calendar</Text>
        </Layout>
    );
};
