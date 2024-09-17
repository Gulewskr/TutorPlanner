import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeader from '../../components/header/Header';

export const Payments: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Payments'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Payments'}>
            <CustomHeader
                firstIcon={'back'}
                firstAction={() => navigation.goBack()}
                secondIcon="settings"
                secondAction={() => navigation.navigate('Settings')}
                centered
            >
                Płatności
            </CustomHeader>
            <Text>This is Payments</Text>
        </Layout>
    );
};
