import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout } from '../Layout';
import { View } from 'react-native';
import { PaymentCreateForm } from '../Payments/components/PaymentCreateForm';
import { RootStackParamList } from '@components/ui/navbar';

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
                <PaymentCreateForm
                    onCancel={navigation.goBack}
                    cb={() => navigation.goBack()}
                />
            </View>
        </Layout>
    );
};
