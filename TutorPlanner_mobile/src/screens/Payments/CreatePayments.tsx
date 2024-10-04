import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PaymentsTabParamList } from './Payments';
import { Layout } from '../Layout';
import { Input } from '@components/input';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { Button } from '@components/button';

export const CreatePayments: React.FC<
    NativeStackScreenProps<PaymentsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Payments'}
            title="Dodaj płatność"
            hasHeader
        >
            <Input
                icon="students"
                placeholder="--Wybierz ucznia--"
                label="Uczeń"
            />
            <Input
                icon="payments"
                placeholder="--Podaj kwote--"
                label="Kwota"
            />

            <View style={styles.double_button_container}>
                <Button
                    icon="minus"
                    onClick={() => navigation.goBack()}
                    label="Anuluj"
                    width={160}
                />
                <Button
                    icon="plus"
                    onClick={() => console.log('Dodaj')}
                    label="Dodaj"
                    width={160}
                />
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
