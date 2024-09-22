import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '@components/header';

export const Settings: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Settings'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Settings'}
            title="Ustawienia"
            hasHeader
        >
            <Text>This is Settings</Text>
        </Layout>
    );
};
