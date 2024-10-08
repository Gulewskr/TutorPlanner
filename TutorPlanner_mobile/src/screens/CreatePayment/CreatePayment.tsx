import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout } from '../Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { Button } from '@components/button';
import { RootStackParamList } from 'src/App';
import { Input } from '@components/input';
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
            {/* TOOD - use form renderer */}

            <View style={{ padding: 15, width: '100%' }}>
                <PaymentsCreateForm onCancel={navigation.goBack} />
            </View>
        </Layout>
    );
};

const styles = EStyleSheet.create({
    double_button_container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
        marginBottom: 5,
    },
});
