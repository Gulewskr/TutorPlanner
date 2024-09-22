import * as React from 'react';
import { View } from 'react-native';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LessonsTabParamList } from './Lessons';
import { Input } from '@components/input';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from '@components/button';

export const CreateLessonForm: React.FC<
    NativeStackScreenProps<LessonsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Lessons'}
            title="Dodaj zajecia"
            hasHeader
        >
            <Input placeholder="--Nazwa wydarzenia--" label="Nazwa" />
            <Input placeholder="--Opis--" label="Opis" />
            <Input
                placeholder="--Wybierz ucznia--"
                label="Uczeń"
                icon="students"
            />
            <Input placeholder="--Podaj cene--" label="Cena" icon="payments" />
            <Input placeholder="--Data--" label="Data" icon="calendar" />
            <Input placeholder="--Godzina--" label="Godzina" />
            <Input placeholder="--Zajecia cotygodniowe--" label="checkbox" />
            <View style={styles.double_button_container}>
                <Button
                    icon="minus"
                    onClick={() => console.log('Anuluj')}
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
