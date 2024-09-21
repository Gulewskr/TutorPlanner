import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '@components/Header';

export const Profile: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Profile'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Students'}
            title="Profil"
            hasHeader
        >
            <Text>This is {route.params?.name}'s profile</Text>
        </Layout>
    );
};
