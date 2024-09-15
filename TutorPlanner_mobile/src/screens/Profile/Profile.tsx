import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const Profile: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Profile'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Students'}>
            <Text>This is {route.params?.name}'s profile</Text>
        </Layout>
    );
};
