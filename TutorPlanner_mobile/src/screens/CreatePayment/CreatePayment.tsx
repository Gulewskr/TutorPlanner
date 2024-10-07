import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout } from '../Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { Button } from '@components/button';
import { RootStackParamList } from 'src/App';
import { Input } from '@components/input';

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
            <Input
                icon="students"
                placeholder="--Wybierz ucznia--"
                label="Uczeń"
                onChange={function (value: string): void {}}
            />
            <Input
                icon="payments"
                placeholder="--Podaj kwote--"
                label="Kwota"
                onChange={function (value: string): void {}}
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
