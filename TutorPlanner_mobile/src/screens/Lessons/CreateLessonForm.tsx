import * as React from 'react';
import { Layout } from '../Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormProvider, FormRenderer } from '@components/complex/form-renderer';
import { lessonsService } from '@services/lessons.service';
import { ActivityIndicator, View } from 'react-native';
import { ScrollView } from '@components/ui/scrool-view';
import { StudentDTO } from '@model';
import { FormRendererSchema } from '@components/complex/form-renderer/model';
import { getFullName } from '@utils/utils';
import { LessonsTabParamList } from '@components/ui/navbar';
import { $color_primary } from '@styles/colors';
import { useStudentsContext } from '@contexts/StudentsContext';
import { useAlert } from '@contexts/AlertContext';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

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
 BottomTabScreenProps<LessonsTabParamList, 'Create'>
> = ({ navigation, route }) => {
    const { showAlert } = useAlert();
    const { loading, data: students } = useStudentsContext();
    const handleSubmit = async (data: CreateLessonData): Promise<void> => {
        try {
            await lessonsService.create({
                name: data.name,
                description: data.description,
                student: Number(data.student),
                price: Number(data.price),
                date: new Date(data.date),
                startHour: data.hour.startHour,
                endHour: data.hour.endHour,
                weekly: data.isWeekly,
            });
            showAlert({
                message: 'Pomyślnie dodano zajęcia',
                severity: 'success',
            });
            navigation.goBack();
        } catch (e) {
            showAlert({
                message: 'Błąd zapisu',
                severity: 'danger',
            });
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
            {loading ? (
                <ActivityIndicator size="large" color={$color_primary} />
            ) : (
                <FormProvider>
                    <ScrollView>
                        <View style={styles.form_container}>
                            <FormRenderer
                                schema={getFormSchema(students)}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                            />
                        </View>
                    </ScrollView>
                </FormProvider>
            )}
        </Layout>
    );
};

const getFormSchema = (students: StudentDTO[]): FormRendererSchema => ({
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
            component: 'dropdown',
            componentProps: {
                label: 'Uczeń',
                icon: 'students',
                placeholder: '--Wybierz ucznia--',
                options: students.map(stud => ({
                    value: stud.id,
                    label: getFullName(stud),
                })),
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
            component: 'datepicker',
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
});

const styles = EStyleSheet.create({
    form_container: {
        width: '100%',
        padding: 15,
    },
});
