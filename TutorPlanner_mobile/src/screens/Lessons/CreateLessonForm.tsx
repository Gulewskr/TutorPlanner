import * as React from 'react';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LessonsTabParamList } from './Lessons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormProvider, FormRenderer } from '@components/form-renderer';
import { lessonsService } from '@services/lessons.service';

interface CreateLessonData {
    name: string;
    description: string;
    student: string;
    price: string;
    date: string;
    hour: {
        startHour: string;
        endHour: string;
    };
    isWeekly: boolean;
}

const defaultData: CreateLessonData = {
    name: '',
    description: '',
    student: '',
    price: '',
    date: '',
    hour: {
        startHour: '',
        endHour: '',
    },
    isWeekly: false,
};

export const CreateLessonForm: React.FC<
    NativeStackScreenProps<LessonsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    const handleSubmit = async (data: CreateLessonData): Promise<void> => {
        try {
            const response = await lessonsService.create({
                name: data.name,
                description: data.description,
                student: Number(data.student),
                price: Number(data.price),
                date: new Date(data.date),
                startHour: data.hour.startHour,
                endHour: data.hour.endHour,
                weekly: data.isWeekly,
            });
            //TODO - move to event in callendar
            console.log(response);
        } catch (e) {
            //TODO - display toast with error notification
        }
    };

    const handleCancel = (): void => {
        navigation.goBack();
    };

    return (
        <Layout
            navigation={navigation}
            route={'Lessons'}
            title="Dodaj zajecia"
            hasHeader
            hasHeaderSeperated
        >
            <FormProvider>
                <FormRenderer
                    schema={{
                        title: 'Dodaj zajęcia',
                        initValue: defaultData,
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
                                //TODO change to datepicker
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
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </FormProvider>
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
