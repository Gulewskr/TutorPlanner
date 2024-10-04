import { Input } from '@components/input';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentsTabParamList } from './Students';
import { View } from 'react-native';
import { Button } from '@components/button';
import EStyleSheet from 'react-native-extended-stylesheet';

export const AddStudent: React.FC<
    NativeStackScreenProps<StudentsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Students'}
            title="Dodaj ucznia"
            hasHeader
        >
            <Input placeholder="--Podaj imię--" label="Imię" />
            <Input placeholder="--Podaj nazwisko--" label="Nazwisko" />
            <Input
                placeholder="--Podaj cene--"
                label="Cena - domyślna"
                icon="payments"
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
