import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout } from '../Layout';
import { View } from 'react-native';
import { RootStackParamList } from 'src/App';
import { PaymentsCreateForm } from '../Payments/components/PaymentsCreateForm';

export const CreatePayment: React.FC<
    NativeStackScreenProps<RootStackParamList, 'CreatePayment'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Payments'}
            title="Dodaj płatność"
            hasHeader
            hasHeaderSeperated
        >
            <View style={{ padding: 15, width: '100%' }}>
                <PaymentsCreateForm onCancel={navigation.goBack} />
            </View>
        </Layout>
    );
};
