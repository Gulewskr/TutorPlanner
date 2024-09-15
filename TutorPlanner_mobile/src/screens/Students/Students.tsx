import * as React from 'react';
import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const Students: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Students'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Students'}>
            <Text>Students list</Text>
        </Layout>
    );
};
