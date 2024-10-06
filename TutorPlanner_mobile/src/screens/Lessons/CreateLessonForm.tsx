import * as React from 'react';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LessonsTabParamList } from './Lessons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormProvider, FormRenderer } from '@components/form-renderer';

export const CreateLessonForm: React.FC<
    NativeStackScreenProps<LessonsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Lessons'}
            title="Dodaj zajecia"
            hasHeader
            hasHeaderSeperated
        >
            <FormProvider>
                <Form />
            </FormProvider>
        </Layout>
    );
};

const Form: React.FC = () => {
    return (
        <FormRenderer
            schema={{
                title: 'Dodaj zajęcia',
                initValue: {},
                fields: {
                    name: {
                        component: 'input',
                        componentProps: {
                            label: 'Nazwa',
                            placeholder: '--Nazwa wydarzenia--',
                        },
                    },
                    description: {
                        component: 'input',
                        componentProps: {
                            label: 'Opis',
                            placeholder: '--Opis--',
                        },
                    },
                    student: {
                        component: 'input',
                        componentProps: {
                            label: 'Uczeń',
                            icon: 'students',
                            placeholder: '--Wybierz ucznia--',
                        },
                    },
                    price: {
                        component: 'input',
                        componentProps: {
                            label: 'Cena',
                            icon: 'payments',
                            placeholder: '--Podaj cene--',
                        },
                    },
                    date: {
                        component: 'input',
                        componentProps: {
                            label: 'Data',
                            icon: 'calendar',
                            placeholder: '--Data--',
                        },
                    },
                    hour: {
                        component: 'hour-input',
                        componentProps: {
                            label: 'Godzina',
                            placeholder: '--Godzina--',
                        },
                    },
                    isWeekly: {
                        component: 'checkbox-tile',
                        componentProps: {
                            label: 'Zajęcia cotygodniowe',
                        },
                    },
                },
            }}
            onSubmit={function (data: any): void {
                console.log('Submit');
                console.log(data);
            }}
            onCancel={function (): void {
                console.log('cancel');
            }}
        />
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
