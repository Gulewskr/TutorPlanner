import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout } from '../Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { Button } from '@components/button';
import { RootStackParamList } from 'src/App';
import { Input } from '@components/input';

export const CreateStudent: React.FC<
    NativeStackScreenProps<RootStackParamList, 'CreateStudent'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Students'}
            title="Dodaj ucznia"
            hasHeader
            hasHeaderSeperated
        >
            {/* TODO - form renderer */}
            <Input
                placeholder="--Podaj imię--"
                label="Imię"
                onChange={function (value: string): void {}}
            />
            <Input
                placeholder="--Podaj nazwisko--"
                label="Nazwisko"
                onChange={function (value: string): void {}}
            />
            <Input
                placeholder="--Podaj cene--"
                label="Cena - domyślna"
                icon="payments"
                onChange={function (value: string): void {}}
            />

            <View style={styles.single_button_container}>
                <Button
                    size="small"
                    icon="plus"
                    label="Dodatkowe dane"
                    onClick={() => console.log('dodatkowe dane')}
                    secondary
                    hasShadow={false}
                />
            </View>
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
    single_button_container: {
        width: 200,
        marginTop: 5,
    },
    double_button_container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
        marginBottom: 5,
    },
});
