import { Text } from 'react-native';
import { Layout } from '../Layout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '@components/Header';

export const Payments: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Payments'>
> = ({ navigation, route }) => {
    return (
        <Layout navigation={navigation} route={'Payments'}>
            <Header
                firstIcon={'back'}
                firstAction={() => navigation.goBack()}
                secondIcon="settings"
                secondAction={() => navigation.navigate('Settings')}
                centered
            >
                Płatności
            </Header>
            <Text>This is Payments</Text>
        </Layout>
    );
};
