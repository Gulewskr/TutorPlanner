import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const Payments: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Payments'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Payments'}>
            <Text>This is Payments</Text>
        </Layout>
    );
};
